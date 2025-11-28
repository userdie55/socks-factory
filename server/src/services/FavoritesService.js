const { Favorite, SocksDesign } = require("../db/models");

class FavoritesService {
  static async getUserFavorites(userId) {
    return Favorite.findAll({
      where: { user_id: userId },
      include: [{ model: SocksDesign }],
      order: [["id", "DESC"]],
    });
  }

  static async addToFavorites(userId, data) {
    const {
      colorHex,
      patternName,
      patternColorHex,
      emoji,
      emojiX,
      emojiY,
      preview,
    } = data;

    const where = {
      colorHex,
      patternName,
      patternColorHex,
      image: emoji || null,
      imageX: emojiX,
      imageY: emojiY,
    };

    let design = await SocksDesign.findOne({ where });


    if (!design) {
      design = await SocksDesign.create({
        colorHex,
        patternName,
        patternColorHex,
        image: emoji || null,
        imageX: emojiX,
        imageY: emojiY,
        preview,
      });
    }

    const existingFavorite = await Favorite.findOne({
      where: { user_id: userId, design_id: design.id },
    });

    if (existingFavorite) return existingFavorite;

    return Favorite.create({
      user_id: userId,
      design_id: design.id,
    });
  }

  static async removeFavorite(id) {
    return Favorite.destroy({ where: { id } });
  }
}

module.exports = FavoritesService;
