const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      this.hasMany(models.SocksDesign, { foreignKey: 'image_id' });
    }
  }
  Image.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Image',
    },
  );
  return Image;
};
