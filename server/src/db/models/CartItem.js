const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      this.belongsTo(models.SocksDesign, { foreignKey: 'design_id', as: 'design' });
    }
  }
  CartItem.init(
    {
      user_id: DataTypes.INTEGER,
      design_id: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
    },
    {
      sequelize,
      modelName: 'CartItem',
    },
  );
  return CartItem;
};
