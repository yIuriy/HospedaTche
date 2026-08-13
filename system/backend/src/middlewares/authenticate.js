const jwt = require('jsonwebtoken');
const database = require('../config/database');

const unauthorized = (res) => res.status(401).json({ error: 'Authentication required' });

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return unauthorized(res);
    }

    const token = authorization.slice('Bearer '.length).trim();
    if (!token || !process.env.JWT_SECRET) {
      return unauthorized(res);
    }

    const claims = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    if (typeof claims.sub !== 'string') {
      return unauthorized(res);
    }

    const user = await database.get(
      `SELECT id, name, email, cpf, role, auth_version
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [claims.sub]
    );

    if (!user || Number(claims.auth_version) !== Number(user.auth_version)) {
      return unauthorized(res);
    }

    req.user = user;
    req.auth = claims;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return unauthorized(res);
    }
    return next(error);
  }
};

module.exports = authenticate;
