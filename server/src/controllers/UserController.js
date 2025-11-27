const UserService = require('../services/UserService');
const { User } = require('../db/models');
const jwt = require('jsonwebtoken');
const generateJWTTokens = require('../utils/generateJWTTokens');
const cookieConfig = require('../config/cookieConfig');
const bcrypt = require('bcrypt');

class UserController {
  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
      const { newAccessToken, newRefreshToken } = generateJWTTokens({ user });

      return res.status(200).cookie('refreshToken', newRefreshToken, cookieConfig).json({ user, accessToken: newAccessToken });
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  static async signUpUser(req, res) {
    const { name, email, password } = req.body;
    const { isValid, error } = User.validateSignUpData({ name, email, password });

    if (!isValid) {
      return res.status(400).json({ error: error.message });
    }

    try {
      const userFound = await UserService.getUserByEmail(email.toLowerCase());

      if (userFound.email) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      const user = await UserService.createUser({ name, email, password });

      if (!user) {
        return res.status(500).json({ error: 'Failed to create new user' });
      }

      const { accessToken, refreshToken } = generateJWTTokens({ user });

      return res.status(201).cookie('refreshToken', refreshToken, cookieConfig).json({ user, accessToken });
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  static async signInUser(req, res) {
    const { email, password } = req.body;
    const { isValid, error } = User.validateSignInData({ email, password });

    if (!isValid) {
      return res.status(400).json({ error: error.message });
    }

    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return res.status(400).json({ error: 'User with this email not found' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      delete user.password;

      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      const { accessToken, refreshToken } = generateJWTTokens({ user });

      return res.status(200).cookie('refreshToken', refreshToken, cookieConfig).json({ user, accessToken });
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  static async signOutUser(req, res) {
    try {
      return res.sendStatus(200).clearCookie('refreshToken');
    } catch (message) {
      return res.status(400).json({ error: message });
    }
  }

  static async getUserCart(req, res) {
    try {
      const {id} = req.params
      const cart = await UserService.getUserCart(id)
      return res.status(200).json({cart})
    } catch (error) {
       return res.status(400).json({ error: message });
    }
  }
}

module.exports = UserController;
