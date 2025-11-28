const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ error: 'No authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).json({ error: 'Token missing' });
    }

    const { user } = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

    req.user = user;
    return next();
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }
}

function verifyRefreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token missing' });
    }

    const { user } = jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_TOKEN
    );

    req.user = user;
    return next();
  } catch (e) {
    return res.status(401).json({ error: e.message });
  }
}

module.exports = { verifyAccessToken, verifyRefreshToken };
