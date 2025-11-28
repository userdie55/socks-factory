const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.SocksDesign, { foreignKey: 'user_id' });
      this.hasMany(models.Favorite, { foreignKey: 'user_id' });
      this.hasOne(models.Cart, { foreignKey: 'user_id', as: 'cart' });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
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
        afterCreate: (user) => delete user.dataValues.password,
      },
      modelName: 'User',
    }
  );

  return User;
};
