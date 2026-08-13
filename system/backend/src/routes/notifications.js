const crypto = require('node:crypto');
const express = require('express');
const { z } = require('zod');
const database = require('../config/database');
const { authenticateToken, requireRole } = require('../middlewares/auth');

const router = express.Router();

const preferencesSchema = z
  .object({
    stay_reminders: z.boolean().optional(),
    promotions: z.boolean().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0);

const formatPreferences = (preferences) => ({
  stay_reminders: preferences ? Boolean(preferences.stay_reminders) : true,
  promotions: preferences ? Boolean(preferences.promotions) : false,
  transactional: true,
  security_alerts: true,
});

router.get('/preferences', authenticateToken, requireRole('Guest'), async (req, res, next) => {
  try {
    const preferences = await database.get(
      `SELECT stay_reminders, promotions
       FROM notification_preferences
       WHERE user_id = ?
       LIMIT 1`,
      [req.user.userId]
    );
    return res.status(200).json({ preferences: formatPreferences(preferences) });
  } catch (error) {
    return next(error);
  }
});

router.put('/preferences', authenticateToken, requireRole('Guest'), async (req, res, next) => {
  const parsed = preferencesSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid notification preferences.' });
  }

  try {
    const preferences = await database.transaction((tx) => {
      const current = formatPreferences(
        tx.get(
          `SELECT stay_reminders, promotions
           FROM notification_preferences
           WHERE user_id = ?
           LIMIT 1`,
          [req.user.userId]
        )
      );
      const nextPreferences = {
        stay_reminders: parsed.data.stay_reminders ?? current.stay_reminders,
        promotions: parsed.data.promotions ?? current.promotions,
      };
      tx.run(
        `INSERT INTO notification_preferences (user_id, stay_reminders, promotions, updated_at)
         VALUES (?, ?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(user_id) DO UPDATE SET
           stay_reminders = excluded.stay_reminders,
           promotions = excluded.promotions,
           updated_at = CURRENT_TIMESTAMP`,
        [req.user.userId, Number(nextPreferences.stay_reminders), Number(nextPreferences.promotions)]
      );
      tx.run(
        `INSERT INTO audit_logs (id, user_id, action, resource, ip_address)
         VALUES (?, ?, 'notification.preferences_updated', ?, ?)`,
        [crypto.randomUUID(), req.user.userId, `users:${req.user.userId}`, req.ip]
      );
      return formatPreferences(nextPreferences);
    });
    return res.status(200).json({ preferences });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
