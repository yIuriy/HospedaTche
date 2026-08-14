const crypto = require('node:crypto');
const express = require('express');
const { z } = require('zod');
const database = require('../config/database');
const { authenticateToken, requireRole } = require('../middlewares/auth');

const router = express.Router();

class PaymentError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const paymentSchema = z
  .object({
    booking_id: z.string().uuid(),
    method: z.enum(['pix', 'credit_card', 'debit_card']),
    mock_status: z.enum(['paid', 'failed']),
  })
  .strict();

const createAudit = (tx, { userId, action, bookingId, ipAddress }) => {
  tx.run(
    `INSERT INTO audit_logs (id, user_id, action, resource, ip_address)
     VALUES (?, ?, ?, ?, ?)`,
    [crypto.randomUUID(), userId, action, `bookings:${bookingId}`, ipAddress]
  );
};

router.post('/process', authenticateToken, requireRole('Guest'), async (req, res, next) => {
  const parsed = paymentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid payment data.' });
  }

  try {
    const result = await database.transaction((tx) => {
      const booking = tx.get(
        `SELECT b.id, b.guest_id, b.room_id, b.check_in, b.check_out, b.total_price, b.status,
                u.name AS guest_name, u.email AS guest_email,
                r.number AS room_number, r.type AS room_type
         FROM bookings b
         JOIN users u ON u.id = b.guest_id
         JOIN rooms r ON r.id = b.room_id
         WHERE b.id = ? AND b.guest_id = ?
         LIMIT 1`,
        [parsed.data.booking_id, req.user.userId]
      );
      if (!booking) throw new PaymentError(404, 'Booking not found.');
      if (booking.status !== 'pending') {
        throw new PaymentError(409, 'Booking is not awaiting payment.');
      }

      const payment = {
        id: crypto.randomUUID(),
        booking_id: booking.id,
        amount: Number(booking.total_price),
        status: parsed.data.mock_status,
        method: parsed.data.method,
        transaction_ref: `mock_${crypto.randomUUID()}`,
      };
      tx.run(
        `INSERT INTO payments (id, booking_id, amount, status, transaction_ref, method)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          payment.id,
          payment.booking_id,
          payment.amount,
          payment.status,
          payment.transaction_ref,
          payment.method,
        ]
      );
      createAudit(tx, {
        userId: req.user.userId,
        action: `payment.${payment.status}`,
        bookingId: booking.id,
        ipAddress: req.ip,
      });

      if (payment.status === 'failed') {
        tx.run(
          `UPDATE bookings
           SET status = 'cancelled', cancelled_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
          [booking.id]
        );
        createAudit(tx, {
          userId: req.user.userId,
          action: 'booking.cancelled',
          bookingId: booking.id,
          ipAddress: req.ip,
        });
        return { payment, booking: { ...booking, status: 'cancelled' } };
      }

      const voucherCode = `HT-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
      tx.run(
        `UPDATE bookings
         SET status = 'confirmed', voucher_code = ?
         WHERE id = ?`,
        [voucherCode, booking.id]
      );
      createAudit(tx, {
        userId: req.user.userId,
        action: 'booking.confirmed',
        bookingId: booking.id,
        ipAddress: req.ip,
      });

      return {
        payment,
        booking: { ...booking, status: 'confirmed' },
        voucher: {
          code: voucherCode,
          booking_id: booking.id,
          guest: {
            id: booking.guest_id,
            full_name: booking.guest_name,
            email: booking.guest_email,
          },
          room: {
            id: booking.room_id,
            number: booking.room_number,
            type: booking.room_type,
          },
          check_in: booking.check_in,
          check_out: booking.check_out,
          total_price: Number(booking.total_price),
          payment_status: 'paid',
          cancellation_policy: 'Refund percentage decreases until check-in according to hotel policy.',
        },
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof PaymentError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return next(error);
  }
});

module.exports = router;
