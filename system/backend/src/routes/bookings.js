const crypto = require('node:crypto');
const express = require('express');
const { z } = require('zod');
const database = require('../config/database');
const { authenticateToken, requireRole } = require('../middlewares/auth');

const router = express.Router();
const millisecondsPerDay = 24 * 60 * 60 * 1000;

class BookingError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, 'Invalid calendar date');

const bookingSchema = z
  .object({
    room_id: z.string().uuid(),
    check_in: dateSchema,
    check_out: dateSchema,
  })
  .strict()
  .refine((value) => value.check_in < value.check_out, {
    message: 'check_in must be before check_out',
  });

const calculateNights = (checkIn, checkOut) =>
  (Date.parse(`${checkOut}T00:00:00.000Z`) - Date.parse(`${checkIn}T00:00:00.000Z`)) /
  millisecondsPerDay;

const getFullRefundDays = () => {
  const configuredDays = Number.parseInt(process.env.REFUND_FULL_DAYS || '7', 10);
  return Number.isInteger(configuredDays) && configuredDays > 0 ? configuredDays : 7;
};

const calculateRefund = (totalPrice, checkIn) => {
  const today = new Date().toISOString().slice(0, 10);
  const daysRemaining = Math.max(0, calculateNights(today, checkIn));
  const fullRefundDays = getFullRefundDays();
  const percentage =
    daysRemaining >= fullRefundDays
      ? 100
      : Math.round((daysRemaining / fullRefundDays) * 10000) / 100;
  const amount = Math.round(Number(totalPrice) * (percentage / 100) * 100) / 100;
  return { daysRemaining, fullRefundDays, percentage, amount };
};

const createAudit = (tx, { userId, action, bookingId, ipAddress }) => {
  tx.run(
    `INSERT INTO audit_logs (id, user_id, action, resource, ip_address)
     VALUES (?, ?, ?, ?, ?)`,
    [crypto.randomUUID(), userId, action, `bookings:${bookingId}`, ipAddress]
  );
};

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    let bookings;
    if (req.user.role === 'Guest') {
      bookings = await database.all(
        `SELECT b.id, b.guest_id, b.room_id, b.check_in, b.check_out, b.total_price, b.status, b.voucher_code, b.cancellation_refund, b.created_at,
                r.number AS room_number, r.type AS room_type, r.price_per_night
         FROM bookings b
         JOIN rooms r ON r.id = b.room_id
         WHERE b.guest_id = ?
         ORDER BY b.created_at DESC`,
        [req.user.userId]
      );
    } else {
      bookings = await database.all(
        `SELECT b.id, b.guest_id, b.room_id, b.check_in, b.check_out, b.total_price, b.status, b.voucher_code, b.cancellation_refund, b.created_at,
                u.name AS guest_name, u.email AS guest_email,
                r.number AS room_number, r.type AS room_type
         FROM bookings b
         JOIN users u ON u.id = b.guest_id
         JOIN rooms r ON r.id = b.room_id
         ORDER BY b.created_at DESC`
      );
    }
    return res.status(200).json({ bookings });
  } catch (error) {
    return next(error);
  }
});

router.post('/', authenticateToken, requireRole('Guest'), async (req, res, next) => {
  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid booking data.' });
  }

  try {
    const booking = await database.transaction((tx) => {
      const room = tx.get(
        `SELECT id, price_per_night, status
         FROM rooms
         WHERE id = ?
         LIMIT 1`,
        [parsed.data.room_id]
      );
      if (!room) throw new BookingError(404, 'Room not found.');
      if (room.status !== 'available') {
        throw new BookingError(409, 'Room is not available for booking.');
      }

      const overlap = tx.get(
        `SELECT id
         FROM bookings
         WHERE room_id = ?
           AND status IN ('pending', 'confirmed')
           AND check_in < ?
           AND check_out > ?
         LIMIT 1`,
        [room.id, parsed.data.check_out, parsed.data.check_in]
      );
      if (overlap) {
        throw new BookingError(409, 'Room is not available for the requested dates.');
      }

      const id = crypto.randomUUID();
      const nights = calculateNights(parsed.data.check_in, parsed.data.check_out);
      const totalPrice = Math.round(Number(room.price_per_night) * nights * 100) / 100;
      tx.run(
        `INSERT INTO bookings (id, guest_id, room_id, check_in, check_out, total_price, status)
         VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
        [id, req.user.userId, room.id, parsed.data.check_in, parsed.data.check_out, totalPrice]
      );
      createAudit(tx, {
        userId: req.user.userId,
        action: 'booking.created',
        bookingId: id,
        ipAddress: req.ip,
      });

      return {
        id,
        guest_id: req.user.userId,
        room_id: room.id,
        check_in: parsed.data.check_in,
        check_out: parsed.data.check_out,
        nights,
        total_price: totalPrice,
        status: 'pending',
      };
    });

    return res.status(201).json({ booking });
  } catch (error) {
    if (error instanceof BookingError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return next(error);
  }
});

router.post('/:id/cancel', authenticateToken, requireRole('Guest'), async (req, res, next) => {
  try {
    const result = await database.transaction((tx) => {
      const booking = tx.get(
        `SELECT id, guest_id, room_id, check_in, check_out, total_price, status
         FROM bookings
         WHERE id = ? AND guest_id = ?
         LIMIT 1`,
        [req.params.id, req.user.userId]
      );
      if (!booking) throw new BookingError(404, 'Booking not found.');
      if (!['pending', 'confirmed'].includes(booking.status)) {
        throw new BookingError(409, 'Booking cannot be cancelled in its current state.');
      }

      const today = new Date().toISOString().slice(0, 10);
      if (booking.check_in <= today) {
        throw new BookingError(409, 'Booking can no longer be cancelled.');
      }

      const policy = calculateRefund(booking.total_price, booking.check_in);
      const paidPayment = tx.get(
        `SELECT id, method, transaction_ref
         FROM payments
         WHERE booking_id = ? AND status = 'paid'
         ORDER BY created_at DESC
         LIMIT 1`,
        [booking.id]
      );
      if (booking.status === 'confirmed' && !paidPayment) {
        throw new BookingError(409, 'Confirmed booking has no refundable payment.');
      }

      const cancelledAt = new Date().toISOString();
      tx.run(
        `UPDATE bookings
         SET status = 'cancelled', cancelled_at = ?, cancellation_refund = ?
         WHERE id = ?`,
        [cancelledAt, paidPayment ? policy.amount : 0, booking.id]
      );
      createAudit(tx, {
        userId: req.user.userId,
        action: 'booking.cancelled',
        bookingId: booking.id,
        ipAddress: req.ip,
      });

      let refundStatus = 'not_applicable';
      if (paidPayment && policy.amount > 0) {
        const refundReference = `mock_refund_${crypto.randomUUID()}`;
        tx.run(
          `INSERT INTO payments
             (id, booking_id, amount, status, transaction_ref, method, refunded_amount, updated_at)
           VALUES (?, ?, ?, 'refunded', ?, ?, ?, CURRENT_TIMESTAMP)`,
          [
            crypto.randomUUID(),
            booking.id,
            policy.amount,
            refundReference,
            paidPayment.method,
            policy.amount,
          ]
        );
        createAudit(tx, {
          userId: req.user.userId,
          action: 'payment.refunded',
          bookingId: booking.id,
          ipAddress: req.ip,
        });
        refundStatus = 'refunded';
      } else if (paidPayment) {
        refundStatus = 'not_eligible';
      }

      return {
        booking: {
          id: booking.id,
          guest_id: booking.guest_id,
          room_id: booking.room_id,
          check_in: booking.check_in,
          check_out: booking.check_out,
          total_price: Number(booking.total_price),
          status: 'cancelled',
          cancelled_at: cancelledAt,
        },
        refund: {
          days_remaining: policy.daysRemaining,
          full_refund_days: policy.fullRefundDays,
          percentage: paidPayment ? policy.percentage : 0,
          amount: paidPayment ? policy.amount : 0,
          status: refundStatus,
        },
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof BookingError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return next(error);
  }
});

module.exports = router;
