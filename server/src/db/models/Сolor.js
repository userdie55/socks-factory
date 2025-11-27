const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      this.hasMany(models.SocksDesign, { foreignKey: 'color_id' });
    }
  }
  Color.init(
    {
      title: DataTypes.STRING,
      hex: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Color',
    },
  );
  return Color;
};
