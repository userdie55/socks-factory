const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.SocksDesign, { foreignKey: 'design_id' });
    }
  }

  Favorite.init(
    {
      user_id: DataTypes.INTEGER,
      design_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Favorite',
    },
  );

  return Favorite;
};
