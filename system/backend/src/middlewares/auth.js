const jwt = require('jsonwebtoken');
const database = require('../config/database');

const unauthorized = (res) => res.status(401).json({ error: 'Authentication required' });

const authenticateToken = async (req, res, next) => {
  try {
    const authorization = req.get('authorization');
    const match = authorization?.match(/^Bearer\s+([^\s]+)$/i);
    if (!match || !process.env.JWT_SECRET) {
      return unauthorized(res);
    }

    const claims = jwt.verify(match[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const userId = claims.userId ?? claims.sub;
    const authVersion = claims.authVersion ?? claims.auth_version;

    if (
      typeof userId !== 'string' ||
      (claims.sub !== undefined && claims.sub !== userId) ||
      typeof claims.role !== 'string'
    ) {
      return unauthorized(res);
    }

    const account = await database.get(
      `SELECT id, name, email, cpf, role, auth_version
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [userId]
    );

    if (
      !account ||
      Number(authVersion) !== Number(account.auth_version) ||
      claims.role !== account.role
    ) {
      return unauthorized(res);
    }

    req.user = {
      ...claims,
      userId: account.id,
      role: account.role,
      authVersion: Number(account.auth_version),
    };
    req.account = account;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return unauthorized(res);
    }
    return next(error);
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  return next();
};

module.exports = { authenticateToken, requireRole };
