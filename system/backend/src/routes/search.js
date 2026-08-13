const express = require('express');
const { z } = require('zod');
const database = require('../config/database');

const router = express.Router();

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  });

const integerQuerySchema = z
  .string()
  .regex(/^\d+$/)
  .transform(Number)
  .refine((value) => Number.isSafeInteger(value) && value > 0 && value <= 20);

const priceQuerySchema = z
  .string()
  .regex(/^\d+(\.\d{1,2})?$/)
  .transform(Number)
  .refine((value) => Number.isFinite(value) && value >= 0);

const searchSchema = z
  .object({
    check_in: dateSchema,
    check_out: dateSchema,
    guests: integerQuerySchema,
    min_price: priceQuerySchema.optional(),
    max_price: priceQuerySchema.optional(),
  })
  .strict()
  .refine((value) => value.check_in < value.check_out)
  .refine(
    (value) =>
      value.min_price === undefined ||
      value.max_price === undefined ||
      value.min_price <= value.max_price
  );

router.get('/rooms', async (req, res, next) => {
  const parsed = searchSchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid search parameters.' });
  }

  try {
    const filters = ['r.status = ?', 'r.capacity >= ?'];
    const params = ['available', parsed.data.guests];
    if (parsed.data.min_price !== undefined) {
      filters.push('r.price_per_night >= ?');
      params.push(parsed.data.min_price);
    }
    if (parsed.data.max_price !== undefined) {
      filters.push('r.price_per_night <= ?');
      params.push(parsed.data.max_price);
    }

    params.push(parsed.data.check_out, parsed.data.check_in);
    const rooms = await database.all(
      `SELECT r.id, r.number, r.type, r.price_per_night, r.capacity
       FROM rooms r
       WHERE ${filters.join(' AND ')}
         AND NOT EXISTS (
           SELECT 1
           FROM bookings b
           WHERE b.room_id = r.id
             AND b.status IN ('pending', 'confirmed')
             AND b.check_in < ?
             AND b.check_out > ?
         )
       ORDER BY r.price_per_night ASC, r.number ASC`,
      params
    );

    return res.status(200).json({ rooms, criteria: parsed.data });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
