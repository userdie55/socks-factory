const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { user } = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
    res.locals.user = user;
    next();
  } catch ({ message }) {
    return res.status(403).json({ error: message });
  }
}

function verifyRefreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
    res.locals.user = user;
    next();
  } catch ({ message }) {
    return res.status(401).json({ error: message });
  }
}

module.exports = { verifyAccessToken, verifyRefreshToken };
