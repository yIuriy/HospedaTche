const express = require('express');
const crypto = require('node:crypto');
const { z } = require('zod');
const database = require('../config/database');
const { authenticateToken, requireRole } = require('../middlewares/auth');

const router = express.Router();

const allowedStatuses = ['available', 'cleaning'];

const roomCreateSchema = z
  .object({
    number: z.string().trim().min(1).max(20),
    type: z.string().trim().min(1).max(60),
    price_per_night: z.coerce.number().positive(),
    capacity: z.coerce.number().int().positive(),
  })
  .strict();

const roomUpdateSchema = z
  .object({
    number: z.string().trim().min(1).max(20).optional(),
    type: z.string().trim().min(1).max(60).optional(),
    price_per_night: z.coerce.number().positive().optional(),
    capacity: z.coerce.number().int().positive().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one room detail must be provided.',
  });

const statusUpdateSchema = z
  .object({
    status: z.enum(allowedStatuses),
  })
  .strict();

const roomQuerySchema = z
  .object({
    type: z.string().trim().min(1).max(60).optional(),
    min_price: z.coerce.number().nonnegative().optional(),
    max_price: z.coerce.number().nonnegative().optional(),
  })
  .refine(
    (value) =>
      value.min_price === undefined ||
      value.max_price === undefined ||
      value.min_price <= value.max_price,
    {
      message: 'min_price must be lower than or equal to max_price.',
    }
  );

const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Invalid request body.',
      details: result.error.issues.map((issue) => issue.message),
    });
  }

  req.validatedBody = result.data;
  return next();
};

const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      error: 'Invalid query parameters.',
      details: result.error.issues.map((issue) => issue.message),
    });
  }

  req.validatedQuery = result.data;
  return next();
};

const auditRoomOperation = async (req, action, roomId) => {
  await database.run(
    `INSERT INTO audit_logs (id, user_id, action, resource, ip_address)
     VALUES (?, ?, ?, ?, ?)`,
    [
      crypto.randomUUID(),
      req.user?.userId || null,
      action,
      `rooms:${roomId}`,
      req.ip || req.socket?.remoteAddress || null,
    ]
  );
};

router.get('/', validateQuery(roomQuerySchema), async (req, res, next) => {
  try {
    // Keep SQL fragments fixed and bind every request value through params.
    const filters = ['status = ?'];
    const params = ['available'];
    const { type, min_price: minPrice, max_price: maxPrice } = req.validatedQuery;

    if (type) {
      filters.push('type = ?');
      params.push(type);
    }

    if (minPrice !== undefined) {
      filters.push('price_per_night >= ?');
      params.push(minPrice);
    }

    if (maxPrice !== undefined) {
      filters.push('price_per_night <= ?');
      params.push(maxPrice);
    }

    const rooms = await database.all(
      `SELECT id, number, type, price_per_night, status, capacity, created_at
       FROM rooms
       WHERE ${filters.join(' AND ')}
       ORDER BY number ASC`,
      params
    );

    return res.status(200).json({ rooms });
  } catch (error) {
    return next(error);
  }
});

router.post(
  '/',
  authenticateToken,
  requireRole('Manager'),
  validateBody(roomCreateSchema),
  async (req, res, next) => {
    try {
      const room = {
        id: crypto.randomUUID(),
        ...req.validatedBody,
        status: 'available',
      };

      await database.run(
        `INSERT INTO rooms (id, number, type, price_per_night, status, capacity)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [room.id, room.number, room.type, room.price_per_night, room.status, room.capacity]
      );

      await auditRoomOperation(req, 'room.created', room.id);

      return res.status(201).json({ room });
    } catch (error) {
      if (String(error.message || '').includes('UNIQUE')) {
        return res.status(409).json({ error: 'Room number already exists.' });
      }

      return next(error);
    }
  }
);

router.put(
  '/:id',
  authenticateToken,
  requireRole('Manager'),
  validateBody(roomUpdateSchema),
  async (req, res, next) => {
    try {
      const existingRoom = await database.get('SELECT id FROM rooms WHERE id = ?', [req.params.id]);

      if (!existingRoom) {
        return res.status(404).json({ error: 'Room not found.' });
      }

      const fieldMap = {
        number: 'number',
        type: 'type',
        price_per_night: 'price_per_night',
        capacity: 'capacity',
      };
      const updates = [];
      const params = [];

      for (const [field, column] of Object.entries(fieldMap)) {
        if (req.validatedBody[field] !== undefined) {
          updates.push(`${column} = ?`);
          params.push(req.validatedBody[field]);
        }
      }

      params.push(req.params.id);

      await database.run(`UPDATE rooms SET ${updates.join(', ')} WHERE id = ?`, params);
      await auditRoomOperation(req, 'room.updated', req.params.id);

      const room = await database.get(
        `SELECT id, number, type, price_per_night, status, capacity, created_at
         FROM rooms
         WHERE id = ?`,
        [req.params.id]
      );

      return res.status(200).json({ room });
    } catch (error) {
      if (String(error.message || '').includes('UNIQUE')) {
        return res.status(409).json({ error: 'Room number already exists.' });
      }

      return next(error);
    }
  }
);

router.patch(
  '/:id/status',
  authenticateToken,
  requireRole('Receptionist'),
  validateBody(statusUpdateSchema),
  async (req, res, next) => {
    try {
      const existingRoom = await database.get('SELECT id FROM rooms WHERE id = ?', [req.params.id]);

      if (!existingRoom) {
        return res.status(404).json({ error: 'Room not found.' });
      }

      await database.run('UPDATE rooms SET status = ? WHERE id = ?', [
        req.validatedBody.status,
        req.params.id,
      ]);
      await auditRoomOperation(req, 'room.status_updated', req.params.id);

      const room = await database.get(
        `SELECT id, number, type, price_per_night, status, capacity, created_at
         FROM rooms
         WHERE id = ?`,
        [req.params.id]
      );

      return res.status(200).json({ room });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
