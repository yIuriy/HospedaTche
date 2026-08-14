const crypto = require('node:crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const database = require('../config/database');
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { registrationSchema } = require('../validation/identity');

const router = express.Router();
const dummyPasswordHash = bcrypt.hashSync('dummy-login-credential', 10);

const loginSchema = z
  .object({
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    password: z.string().min(1).max(128),
  })
  .strict();

const staffRoleSchema = z.enum(['Receptionist', 'Manager']);
const staffAccountSchema = registrationSchema.extend({
  role: staffRoleSchema,
});
const staffPromotionSchema = z
  .object({
    user_id: z.string().uuid(),
    role: staffRoleSchema,
  })
  .strict();

const asyncRoute = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const recordAudit = ({ userId = null, action, resource, ipAddress = null }) =>
  database.run(
    `INSERT INTO audit_logs (id, user_id, action, resource, ip_address)
     VALUES (?, ?, ?, ?, ?)`,
    [crypto.randomUUID(), userId, action, resource, ipAddress]
  );

router.post(
  '/auth/login',
  asyncRoute(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      await recordAudit({
        action: 'LOGIN_FAILURE',
        resource: 'authentication',
        ipAddress: req.ip,
      });
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = await database.get(
      `SELECT id, name, email, password_hash, role, auth_version
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [parsed.data.email]
    );
    const passwordMatches = await bcrypt.compare(
      parsed.data.password,
      user?.password_hash ?? dummyPasswordHash
    );

    if (!user || !passwordMatches) {
      await recordAudit({
        userId: user?.id,
        action: 'LOGIN_FAILURE',
        resource: 'authentication',
        ipAddress: req.ip,
      });
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        authVersion: Number(user.auth_version),
      },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '2h',
        subject: user.id,
      }
    );

    await recordAudit({
      userId: user.id,
      action: 'LOGIN_SUCCESS',
      resource: 'authentication',
      ipAddress: req.ip,
    });

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        full_name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  })
);

router.post(
  '/auth/logout',
  authenticateToken,
  asyncRoute(async (req, res) => {
    await database.run(
      `UPDATE users
       SET auth_version = auth_version + 1
       WHERE id = ?`,
      [req.user.userId]
    );
    await recordAudit({
      userId: req.user.userId,
      action: 'LOGOUT',
      resource: `user:${req.user.userId}`,
      ipAddress: req.ip,
    });
    return res.status(204).send();
  })
);

router.post(
  '/admin/users',
  authenticateToken,
  requireRole('Administrator'),
  asyncRoute(async (req, res) => {
    if (req.body && Object.prototype.hasOwnProperty.call(req.body, 'user_id')) {
      const promotion = staffPromotionSchema.safeParse(req.body);
      if (!promotion.success) {
        return res.status(400).json({ error: 'Invalid staff promotion data' });
      }

      const target = await database.get(
        `SELECT id, name, email, cpf, role
         FROM users
         WHERE id = ?
         LIMIT 1`,
        [promotion.data.user_id]
      );
      if (!target) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (target.role === 'Administrator') {
        return res.status(409).json({ error: 'Unable to update staff account' });
      }

      await database.run(
        `UPDATE users
         SET role = ?, auth_version = auth_version + 1
         WHERE id = ?`,
        [promotion.data.role, target.id]
      );
      await recordAudit({
        userId: req.user.userId,
        action: 'USER_ROLE_UPDATED',
        resource: `user:${target.id}`,
        ipAddress: req.ip,
      });

      return res.status(200).json({
        user: {
          id: target.id,
          full_name: target.name,
          email: target.email,
          cpf: target.cpf,
          role: promotion.data.role,
        },
        sessions_revoked: true,
      });
    }

    const parsed = staffAccountSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid staff account data' });
    }

    const { email, cpf, password, full_name: fullName, role } = parsed.data;
    const existingUser = await database.get(
      'SELECT id FROM users WHERE email = ? OR cpf = ? LIMIT 1',
      [email, cpf]
    );
    if (existingUser) {
      return res.status(409).json({ error: 'Unable to create staff account' });
    }

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);
    try {
      await database.run(
        `INSERT INTO users (id, name, email, cpf, password_hash, role)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, fullName, email, cpf, passwordHash, role]
      );
    } catch (error) {
      if (/UNIQUE constraint failed/i.test(error.message)) {
        return res.status(409).json({ error: 'Unable to create staff account' });
      }
      throw error;
    }

    await recordAudit({
      userId: req.user.userId,
      action: 'STAFF_ACCOUNT_CREATED',
      resource: `user:${id}`,
      ipAddress: req.ip,
    });

    return res.status(201).json({
      user: { id, full_name: fullName, email, cpf, role },
    });
  })
);

module.exports = router;
