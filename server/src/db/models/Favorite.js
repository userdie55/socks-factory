"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      Favorite.belongsTo(models.SocksDesign, {
        foreignKey: "design_id",
      });
    }
  }

  Favorite.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      design_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );

  return Favorite;
};
