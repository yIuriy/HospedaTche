const crypto = require('node:crypto');
const express = require('express');
const { z } = require('zod');
const database = require('../config/database');
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { escapeHtml } = require('../security/html');

const router = express.Router();

class ReviewError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const reviewSchema = z
  .object({
    booking_id: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().trim().min(1).max(2000).transform(escapeHtml),
  })
  .strict();

const moderationSchema = z
  .object({
    status: z.enum(['approved', 'hidden']),
    reason: z.string().trim().min(3).max(500).optional(),
  })
  .strict()
  .refine((value) => value.status !== 'hidden' || value.reason !== undefined);

const createAudit = (tx, { userId, action, reviewId, ipAddress }) => {
  tx.run(
    `INSERT INTO audit_logs (id, user_id, action, resource, ip_address)
     VALUES (?, ?, ?, ?, ?)`,
    [crypto.randomUUID(), userId, action, `reviews:${reviewId}`, ipAddress]
  );
};

router.post('/', authenticateToken, requireRole('Guest'), async (req, res, next) => {
  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid review data.' });
  }

  try {
    const review = await database.transaction((tx) => {
      const booking = tx.get(
        `SELECT id, status, check_out
         FROM bookings
         WHERE id = ? AND guest_id = ?
         LIMIT 1`,
        [parsed.data.booking_id, req.user.userId]
      );
      if (!booking) throw new ReviewError(404, 'Booking not found.');

      const today = new Date().toISOString().slice(0, 10);
      const completedStay =
        booking.status === 'completed' ||
        (booking.status === 'confirmed' && booking.check_out <= today);
      if (!completedStay) {
        throw new ReviewError(403, 'A completed stay is required to submit a review.');
      }

      const duplicate = tx.get('SELECT id FROM reviews WHERE booking_id = ? LIMIT 1', [booking.id]);
      if (duplicate) throw new ReviewError(409, 'A review already exists for this stay.');

      const reviewId = crypto.randomUUID();
      tx.run(
        `INSERT INTO reviews (id, guest_id, booking_id, rating, comment, status)
         VALUES (?, ?, ?, ?, ?, 'pending')`,
        [reviewId, req.user.userId, booking.id, parsed.data.rating, parsed.data.comment]
      );
      createAudit(tx, {
        userId: req.user.userId,
        action: 'review.created',
        reviewId,
        ipAddress: req.ip,
      });

      return {
        id: reviewId,
        booking_id: booking.id,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
        status: 'pending',
      };
    });

    return res.status(201).json({ review });
  } catch (error) {
    if (error instanceof ReviewError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const reviews = await database.all(
      `SELECT rv.id, rv.rating, rv.comment, rv.created_at,
              u.name AS guest_name, r.type AS room_type
       FROM reviews rv
       JOIN users u ON u.id = rv.guest_id
       JOIN bookings b ON b.id = rv.booking_id
       JOIN rooms r ON r.id = b.room_id
       WHERE rv.status = 'approved'
       ORDER BY rv.created_at DESC`
    );
    return res.status(200).json({ reviews });
  } catch (error) {
    return next(error);
  }
});

router.patch(
  '/:id/moderate',
  authenticateToken,
  requireRole('Manager'),
  async (req, res, next) => {
    const parsed = moderationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid moderation data.' });
    }

    try {
      const review = await database.transaction((tx) => {
        const existing = tx.get(
          `SELECT id, rating, comment, status
           FROM reviews
           WHERE id = ?
           LIMIT 1`,
          [req.params.id]
        );
        if (!existing) throw new ReviewError(404, 'Review not found.');

        tx.run(
          `UPDATE reviews
           SET status = ?, moderated_by = ?, moderation_reason = ?, moderated_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
          [parsed.data.status, req.user.userId, parsed.data.reason ?? null, existing.id]
        );
        createAudit(tx, {
          userId: req.user.userId,
          action: `review.${parsed.data.status}`,
          reviewId: existing.id,
          ipAddress: req.ip,
        });

        return {
          ...existing,
          status: parsed.data.status,
          moderation_reason: parsed.data.reason ?? null,
        };
      });
      return res.status(200).json({ review });
    } catch (error) {
      if (error instanceof ReviewError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return next(error);
    }
  }
);

module.exports = router;
