const crypto = require('node:crypto');
const express = require('express');
const { z } = require('zod');
const database = require('../config/database');
const { authenticateToken, requireRole } = require('../middlewares/auth');

const router = express.Router();

const companionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  cpf_or_passport: z.string().trim().min(1).max(50),
});

const checkInSchema = z.object({
  booking_id: z.string().uuid(),
  guest_document: z.string().trim().min(1).max(50),
  companions: z.array(companionSchema).optional().default([]),
});

// POST /api/v1/stay/check-in - Process Guest Check-In (RF35, RF37, RF38)
router.post(
  '/check-in',
  authenticateToken,
  requireRole('Receptionist', 'Manager'),
  async (req, res, next) => {
    const parsed = checkInSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Dados de check-in inválidos.' });
    }

    try {
      const booking = await database.get(
        `SELECT id, room_id, status FROM bookings WHERE id = ? LIMIT 1`,
        [parsed.data.booking_id]
      );
      if (!booking) return res.status(404).json({ error: 'Reserva não encontrada.' });
      if (booking.status !== 'confirmed') {
        return res.status(409).json({ error: 'Apenas reservas confirmadas com pagamento efetuado podem realizar check-in.' });
      }

      await database.transaction((tx) => {
        tx.run("UPDATE bookings SET status = 'checked_in' WHERE id = ?", [booking.id]);
        tx.run(
          `INSERT INTO audit_logs (id, user_id, action, resource, ip_address)
           VALUES (?, ?, 'stay.check_in', ?, ?)`,
          [crypto.randomUUID(), req.user.userId, `bookings:${booking.id}`, req.ip]
        );
      });

      return res.status(200).json({
        message: 'Check-in realizado com sucesso!',
        booking_id: booking.id,
        status: 'checked_in',
        companions_registered: parsed.data.companions.length,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// POST /api/v1/stay/check-out - Process Check-Out & Move to Cleaning Queue (RF36, RF39)
router.post(
  '/check-out',
  authenticateToken,
  requireRole('Receptionist', 'Manager'),
  async (req, res, next) => {
    const bookingId = req.body?.booking_id;
    if (!bookingId) return res.status(400).json({ error: 'booking_id é obrigatório.' });

    try {
      const booking = await database.get(
        `SELECT id, room_id, status FROM bookings WHERE id = ? LIMIT 1`,
        [bookingId]
      );
      if (!booking) return res.status(404).json({ error: 'Reserva não encontrada.' });

      await database.transaction((tx) => {
        tx.run("UPDATE bookings SET status = 'completed' WHERE id = ?", [booking.id]);
        tx.run("UPDATE rooms SET status = 'cleaning' WHERE id = ?", [booking.room_id]);
        tx.run(
          `INSERT INTO audit_logs (id, user_id, action, resource, ip_address)
           VALUES (?, ?, 'stay.check_out', ?, ?)`,
          [crypto.randomUUID(), req.user.userId, `bookings:${booking.id}`, req.ip]
        );
      });

      return res.status(200).json({
        message: 'Check-out concluído. Quarto encaminhado para a fila de limpeza.',
        booking_id: booking.id,
        room_id: booking.room_id,
        room_status: 'cleaning',
      });
    } catch (error) {
      return next(error);
    }
  }
);

// GET /api/v1/stay/cleaning-queue - Cleaning & Maintenance Queue (RF39, RF40)
router.get(
  '/cleaning-queue',
  authenticateToken,
  requireRole('Receptionist', 'Manager'),
  async (req, res, next) => {
    try {
      const rooms = await database.all(
        `SELECT id, number, type, status, capacity
         FROM rooms
         WHERE status IN ('cleaning', 'maintenance')
         ORDER BY number ASC`
      );
      return res.status(200).json({ cleaning_queue: rooms });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
