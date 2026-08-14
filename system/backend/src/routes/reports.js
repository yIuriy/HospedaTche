const express = require('express');
const database = require('../config/database');
const { authenticateToken, requireRole } = require('../middlewares/auth');

const router = express.Router();

// GET /api/v1/reports/audit-logs - Administrator Audit Reports (RF48, RF53, RF54)
router.get(
  '/audit-logs',
  authenticateToken,
  requireRole('Administrator', 'Manager'),
  async (req, res, next) => {
    try {
      const logs = await database.all(
        `SELECT a.id, a.user_id, a.action, a.resource, a.ip_address, a.timestamp,
                u.name AS user_name, u.email AS user_email, u.role AS user_role
         FROM audit_logs a
         LEFT JOIN users u ON u.id = a.user_id
         ORDER BY a.timestamp DESC
         LIMIT 100`
      );
      return res.status(200).json({ logs });
    } catch (error) {
      return next(error);
    }
  }
);

// GET /api/v1/reports/metrics - Manager Reports (RF50, RF52)
router.get(
  '/metrics',
  authenticateToken,
  requireRole('Manager', 'Administrator'),
  async (req, res, next) => {
    try {
      const totalBookings = await database.get('SELECT COUNT(*) AS count FROM bookings');
      const confirmedBookings = await database.get("SELECT COUNT(*) AS count FROM bookings WHERE status = 'confirmed'");
      const cancelledBookings = await database.get("SELECT COUNT(*) AS count FROM bookings WHERE status = 'cancelled'");
      const totalRevenue = await database.get(
        "SELECT SUM(amount) AS total FROM payments WHERE status = 'paid'"
      );
      const totalRooms = await database.get('SELECT COUNT(*) AS count FROM rooms');
      const availableRooms = await database.get("SELECT COUNT(*) AS count FROM rooms WHERE status = 'available'");
      const cleaningRooms = await database.get("SELECT COUNT(*) AS count FROM rooms WHERE status = 'cleaning'");

      const occupancyRate = totalRooms?.count > 0 
        ? Math.round(((totalRooms.count - availableRooms.count) / totalRooms.count) * 100) 
        : 0;

      return res.status(200).json({
        metrics: {
          total_bookings: totalBookings?.count || 0,
          confirmed_bookings: confirmedBookings?.count || 0,
          cancelled_bookings: cancelledBookings?.count || 0,
          total_revenue: totalRevenue?.total || 0,
          total_rooms: totalRooms?.count || 0,
          available_rooms: availableRooms?.count || 0,
          cleaning_rooms: cleaningRooms?.count || 0,
          occupancy_rate_percentage: occupancyRate,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
