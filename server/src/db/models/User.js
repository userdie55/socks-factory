const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}

    static validateEmail(email) {
      const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
      return emailPattern.test(email);
    }

    static validatePassword(password) {
      const hasUpperCase = /[A-Z]/;
      const hasLowerCase = /[a-z]/;
      const hasNumbers = /\d/;
      const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
      const isValidLength = password.length >= 8;

      if (!hasUpperCase.test(password) || !hasLowerCase.test(password) || !hasNumbers.test(password) || !hasSpecialCharacters.test(password) || !isValidLength) {
        return false;
      }

      return true;
    }

    static validateSignInData({ email, password }) {
      if (!email || typeof email !== 'string' || email.trim().length === 0) {
        return {
          isValid: false,
          error: 'Email should not be empty',
        };
      }

      if (!password || typeof password !== 'string' || password.trim().length === 0) {
        return {
          isValid: false,
          error: 'Password should not be empty',
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }

    static validateSignUpData({ name, email, password }) {
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return {
          isValid: false,
          error: 'Username field should not be empty',
        };
      }

      if (!email || typeof email !== 'string' || email.trim().length === 0 || !this.validateEmail(email)) {
        return {
          isValid: false,
          error: 'Email must be valid',
        };
      }

      if (!password || typeof password !== 'string' || password.trim().length === 0 || !this.validatePassword(password)) {
        return {
          isValid: false,
          error: 'Password should not be empty, must contain one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long',
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
          user.email = user.email.trim().toLowerCase();
        },
        afterCreate: (user) => {
          delete user.get().password
        },
      },
      modelName: 'User',
    },
  );
  return User;
};
