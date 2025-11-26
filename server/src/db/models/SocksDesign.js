const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocksDesign extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Color, { foreignKey: 'color_id' });
      this.belongsTo(models.Image, { foreignKey: 'image_id' });
      this.belongsTo(models.Pattern, { foreignKey: 'pattern_id' });
    }
  }
  SocksDesign.init(
    {
      user_id: DataTypes.INTEGER,
      color_id: DataTypes.INTEGER,
      image_id: DataTypes.INTEGER,
      pattern_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SocksDesign',
    },
  );
  return SocksDesign;
};
