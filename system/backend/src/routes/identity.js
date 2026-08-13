const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('node:crypto');
const { z } = require('zod');
const database = require('../config/database');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

const normalizeCpf = (value) => value.replace(/\D/g, '');

const isValidCpf = (value) => {
  const cpf = normalizeCpf(value);
  if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) return false;

  const calculateDigit = (length) => {
    let sum = 0;
    for (let index = 0; index < length; index += 1) {
      sum += Number(cpf[index]) * (length + 1 - index);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return calculateDigit(9) === Number(cpf[9]) && calculateDigit(10) === Number(cpf[10]);
};

const fullNameSchema = z
  .string()
  .trim()
  .min(2)
  .max(100)
  .transform((value) => value.replace(/\s+/g, ' '))
  .refine((value) => /^[\p{L}\p{M}.' -]+$/u.test(value), 'Invalid full name');

const cpfSchema = z
  .string()
  .trim()
  .refine(isValidCpf, 'Invalid CPF')
  .transform(normalizeCpf);

const passwordSchema = z
  .string()
  .min(12)
  .max(128)
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/\d/, 'Password must contain a number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain a special character');

const registrationSchema = z
  .object({
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    cpf: cpfSchema,
    password: passwordSchema,
    full_name: fullNameSchema,
  })
  .strict();

const profileUpdateSchema = z
  .object({
    full_name: fullNameSchema.optional(),
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()).optional(),
    cpf: cpfSchema.optional(),
    password: passwordSchema.optional(),
    current_password: z.string().max(128).optional(),
  })
  .strict()
  .refine(
    (value) =>
      value.full_name !== undefined ||
      value.email !== undefined ||
      value.cpf !== undefined ||
      value.password !== undefined,
    {
    message: 'At least one profile field is required',
    }
  );

const asyncRoute = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

router.post(
  '/auth/register',
  asyncRoute(async (req, res) => {
    const parsed = registrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Invalid registration data',
        fields: parsed.error.issues.map((issue) => issue.path.join('.')).filter(Boolean),
      });
    }

    const { email, cpf, password, full_name: fullName } = parsed.data;
    const existingUser = await database.get(
      'SELECT id FROM users WHERE email = ? OR cpf = ? LIMIT 1',
      [email, cpf]
    );

    if (existingUser) {
      return res.status(409).json({ error: 'Unable to create account with the provided identity data' });
    }

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);

    try {
      await database.run(
        `INSERT INTO users (id, name, email, cpf, password_hash, role)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, fullName, email, cpf, passwordHash, 'Guest']
      );
    } catch (error) {
      if (/UNIQUE constraint failed/i.test(error.message)) {
        return res.status(409).json({ error: 'Unable to create account with the provided identity data' });
      }
      throw error;
    }

    return res.status(201).json({
      user: {
        id,
        full_name: fullName,
        email,
        cpf,
        role: 'Guest',
      },
    });
  })
);

router.get('/users/me', authenticate, (req, res) => {
  return res.status(200).json({
    user: {
      id: req.user.id,
      full_name: req.user.name,
      email: req.user.email,
      cpf: req.user.cpf,
      role: req.user.role,
    },
  });
});

router.put(
  '/users/me',
  authenticate,
  asyncRoute(async (req, res) => {
    const parsed = profileUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid profile data' });
    }

    const updates = [];
    const params = [];

    if (parsed.data.full_name !== undefined) {
      updates.push('name = ?');
      params.push(parsed.data.full_name);
    }

    const requiresStepUp =
      parsed.data.email !== undefined ||
      parsed.data.cpf !== undefined ||
      parsed.data.password !== undefined;

    if (requiresStepUp) {
      const credentials = await database.get('SELECT password_hash FROM users WHERE id = ? LIMIT 1', [
        req.user.id,
      ]);
      const reauthenticated =
        credentials &&
        parsed.data.current_password &&
        (await bcrypt.compare(parsed.data.current_password, credentials.password_hash));

      if (!reauthenticated) {
        return res.status(403).json({ error: 'Step-up authentication required' });
      }
    }

    if (parsed.data.email !== undefined) {
      const duplicate = await database.get('SELECT id FROM users WHERE email = ? AND id <> ? LIMIT 1', [
        parsed.data.email,
        req.user.id,
      ]);
      if (duplicate) {
        return res.status(409).json({ error: 'Unable to update account with the provided identity data' });
      }

      updates.push('email = ?');
      params.push(parsed.data.email);
    }

    if (parsed.data.cpf !== undefined) {
      const duplicate = await database.get('SELECT id FROM users WHERE cpf = ? AND id <> ? LIMIT 1', [
        parsed.data.cpf,
        req.user.id,
      ]);
      if (duplicate) {
        return res.status(409).json({ error: 'Unable to update account with the provided identity data' });
      }

      updates.push('cpf = ?');
      params.push(parsed.data.cpf);
    }

    if (parsed.data.password !== undefined) {
      updates.push('password_hash = ?');
      params.push(await bcrypt.hash(parsed.data.password, 10));
      updates.push('auth_version = auth_version + 1');
    }

    params.push(req.user.id);
    try {
      await database.run(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params);
    } catch (error) {
      if (/UNIQUE constraint failed/i.test(error.message)) {
        return res.status(409).json({ error: 'Unable to update account with the provided identity data' });
      }
      throw error;
    }

    return res.status(200).json({
      user: {
        id: req.user.id,
        full_name: parsed.data.full_name ?? req.user.name,
        email: parsed.data.email ?? req.user.email,
        cpf: parsed.data.cpf ?? req.user.cpf,
        role: req.user.role,
      },
      sessions_revoked: parsed.data.password !== undefined,
    });
  })
);

module.exports = router;
