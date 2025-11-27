const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.SocksDesign, { foreignKey: 'user_id' });
      this.hasMany(models.Favorite, { foreignKey: 'user_id' });
      this.hasOne(models.Cart, { foreignKey: 'user_id', as: 'cart' });
    }

    static validateEmail(email) {
      const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
      return emailPattern.test(email);
    }

    static validatePassword(password) {
      const hasUpper = /[A-Z]/;
      const hasLower = /[a-z]/;
      const hasNum = /\d/;
      const hasSpecial = /[!@#$%^&*()\-_.?":{}|<>]/;
      const isLong = password.length >= 8;

      return hasUpper.test(password) &&
             hasLower.test(password) &&
             hasNum.test(password) &&
             hasSpecial.test(password) &&
             isLong;
    }

    static validateSignInData({ email, password }) {
      if (!email?.trim())
        return { isValid: false, error: 'Email should not be empty' };

      if (!password?.trim())
        return { isValid: false, error: 'Password should not be empty' };

      return { isValid: true, error: null };
    }

    static validateSignUpData({ name, email, password }) {
      if (!name?.trim())
        return { isValid: false, error: 'Username field should not be empty' };

      if (!email?.trim() || !this.validateEmail(email))
        return { isValid: false, error: 'Email must be valid' };

      if (!password || !this.validatePassword(password))
        return {
          isValid: false,
          error:
            'Password must contain uppercase, lowercase, number, special char and be at least 8 characters',
        };

      return { isValid: true, error: null };
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true, // ← ДОБАВЛЕНО!
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      hooks: {
        beforeCreate: async (user) => {
          user.email = user.email.trim().toLowerCase();
          user.password = await bcrypt.hash(user.password, 10);
        },

        afterCreate: (user) => {
          // Правильное удаление поля
          delete user.dataValues.password;
        },
      },
      modelName: 'User',
    },
  );

  return User;
};
