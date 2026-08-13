const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth');
const identityRoutes = require('./routes/identity');
const roomsRouter = require('./routes/rooms');
const bookingsRouter = require('./routes/bookings');
const paymentsRouter = require('./routes/payments');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Payload size limits to mitigate DoS / buffer overflow attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Health Check Endpoints
app.get(['/health', '/api/v1/health'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    system: 'HospedaTche Backend',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1', authRoutes);
app.use('/api/v1', identityRoutes);
app.use('/api/v1/rooms', roomsRouter);
app.use('/api/v1/bookings', bookingsRouter);
app.use('/api/v1/payments', paymentsRouter);

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
