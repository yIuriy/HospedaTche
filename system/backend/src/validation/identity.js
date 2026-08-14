const { z } = require('zod');

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

const emailSchema = z.string().trim().email().max(254).transform((value) => value.toLowerCase());

const registrationSchema = z
  .object({
    email: emailSchema,
    cpf: cpfSchema,
    password: passwordSchema,
    full_name: fullNameSchema,
  })
  .strict();

module.exports = {
  cpfSchema,
  emailSchema,
  fullNameSchema,
  passwordSchema,
  registrationSchema,
};
