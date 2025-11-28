const UserService = require('../services/UserService');
const { User } = require('../db/models');
const jwt = require('jsonwebtoken');
const generateJWTTokens = require('../utils/generateJWTTokens');
const cookieConfig = require('../config/cookieConfig');
const bcrypt = require('bcrypt');

class UserController {

  // 🔄 refresh tokens
  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token missing' });
      }

      const { user } = jwt.verify(
        refreshToken,
        process.env.SECRET_REFRESH_TOKEN
      );

      const { accessToken, refreshToken: newRefreshToken } =
        generateJWTTokens({ user });

      return res
        .status(200)
        .cookie('refreshToken', newRefreshToken, cookieConfig)
        .json({ user, accessToken });
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  // 📝 Регистрация
  static async signUpUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const existing = await UserService.getUserByEmail(email.toLowerCase());
      if (existing) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await UserService.createUser({ name, email, password });

      const { accessToken, refreshToken } = generateJWTTokens({ user });

      return res
        .status(201)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json({ user, accessToken });

    } catch ({ message }) {
      console.log(message);
      return res.status(500).json({ error: message });
    }
  }

  // 🔐 Вход
  static async signInUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const user = await UserService.getUserByEmail(email.toLowerCase());
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      delete user.password;

      const { accessToken, refreshToken } = generateJWTTokens({ user });

      return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json({ user, accessToken });

    } catch ({ message }) {
      return res.status(500).json({ error: message });
    }
  }

  // 🚪 Выход
  static async signOutUser(req, res) {
    try {
      res.clearCookie('refreshToken');
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;