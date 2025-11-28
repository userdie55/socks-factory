const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocksDesign extends Model {
    static associate(models) {
      this.hasMany(models.CartItem, { foreignKey: 'design_id' });
    }
  }
  SocksDesign.init(
    {
      colorHex: DataTypes.STRING,
      patternName: DataTypes.STRING,
      patternColorHex: DataTypes.STRING,
      image: DataTypes.TEXT,
      imageX: DataTypes.INTEGER,
      imageY: DataTypes.INTEGER,
      preview: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'SocksDesign',
    },
  );
  return SocksDesign;
};
