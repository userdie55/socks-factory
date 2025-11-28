const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SocksDesign extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Cart, { foreignKey: 'cart_id' });
      this.hasMany(models.Favorite, { foreignKey: 'design_id' });
    }
  }

  SocksDesign.init(
    {
      user_id: DataTypes.INTEGER,
      cart_id: DataTypes.INTEGER,

      design_json: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'SocksDesign',
    },
  );

  return SocksDesign;
};
