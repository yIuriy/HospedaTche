const crypto = require('node:crypto');
const express = require('express');
const { z } = require('zod');
const database = require('../config/database');
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { escapeHtml } = require('../security/html');

const router = express.Router();

const messageSchema = z
  .object({
    guest_id: z.string().uuid().optional(),
    message: z.string().trim().min(1).max(1000).transform(escapeHtml),
  })
  .strict();

const historySchema = z
  .object({
    guest_id: z.string().uuid().optional(),
  })
  .strict();

router.post(
  '/messages',
  authenticateToken,
  requireRole('Guest', 'Receptionist'),
  async (req, res, next) => {
    const parsed = messageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid chat message.' });
    }

    if (
      req.user.role === 'Guest' &&
      parsed.data.guest_id !== undefined &&
      parsed.data.guest_id !== req.user.userId
    ) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    if (req.user.role === 'Receptionist' && parsed.data.guest_id === undefined) {
      return res.status(400).json({ error: 'guest_id is required for staff replies.' });
    }

    const guestId = req.user.role === 'Guest' ? req.user.userId : parsed.data.guest_id;

    try {
      const guest = await database.get(
        `SELECT id
         FROM users
         WHERE id = ? AND role = 'Guest'
         LIMIT 1`,
        [guestId]
      );
      if (!guest) return res.status(404).json({ error: 'Guest conversation not found.' });

      const message = {
        id: crypto.randomUUID(),
        guest_id: guestId,
        sender_id: req.user.userId,
        sender_role: req.user.role,
        message: parsed.data.message,
      };
      await database.transaction((tx) => {
        tx.run(
          `INSERT INTO chat_messages (id, guest_id, sender_id, sender_role, message)
           VALUES (?, ?, ?, ?, ?)`,
          [message.id, message.guest_id, message.sender_id, message.sender_role, message.message]
        );
        tx.run(
          `INSERT INTO audit_logs (id, user_id, action, resource, ip_address)
           VALUES (?, ?, 'chat.message_sent', ?, ?)`,
          [crypto.randomUUID(), req.user.userId, `chat:${guestId}`, req.ip]
        );
      });

      return res.status(201).json({ message });
    } catch (error) {
      return next(error);
    }
  }
);

router.get('/messages', authenticateToken, async (req, res, next) => {
  const parsed = historySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid chat query.' });
  }

  const isGuest = req.user.role === 'Guest';
  const isStaff = ['Receptionist', 'Manager'].includes(req.user.role);
  if (!isGuest && !isStaff) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (isGuest && parsed.data.guest_id && parsed.data.guest_id !== req.user.userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const guestId = isGuest ? req.user.userId : parsed.data.guest_id;

  try {
    const params = [];
    const filter = guestId ? 'WHERE cm.guest_id = ?' : '';
    if (guestId) params.push(guestId);
    const messages = await database.all(
      `SELECT cm.id, cm.guest_id, cm.sender_id, cm.sender_role, cm.message, cm.created_at,
              guest.name AS guest_name, sender.name AS sender_name
       FROM chat_messages cm
       JOIN users guest ON guest.id = cm.guest_id
       JOIN users sender ON sender.id = cm.sender_id
       ${filter}
       ORDER BY cm.created_at ASC, cm.id ASC`,
      params
    );
    return res.status(200).json({ messages });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
