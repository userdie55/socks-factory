const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pattern extends Model {
    static associate(models) {
      this.hasMany(models.SocksDesign, { foreignKey: 'pattern_id' });
    }
  }
  Pattern.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Pattern',
    },
  );
  return Pattern;
};
