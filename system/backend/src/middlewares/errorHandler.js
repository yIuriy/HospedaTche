/**
 * Centralized Error Handling Middleware
 * Prevents leakage of internal stack traces, database details, or credentials to client endpoints.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);
  const isProduction = process.env.NODE_ENV === 'production';

  // Log error internally for operational and security investigation
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, {
    message: err.message,
    status: statusCode,
    stack: isProduction ? undefined : err.stack,
  });

  // Standardized, safe error response
  res.status(statusCode).json({
    error: err.isOperational ? err.message : 'Internal server error',
    ...(isProduction ? {} : { details: err.message }),
  });
};

module.exports = errorHandler;
