const { CartItem, SocksDesign } = require('../db/models');

class CartService {
  static async addToCart(userId, data) {
    const { colorHex, patternName, patternColorHex, emoji, emojiX, emojiY, preview } = data;

    // Формируем объект условий — только поля, у которых есть значения
    const where = {};

    if (colorHex) where.colorHex = colorHex;
    if (patternName) where.patternName = patternName;
    if (patternColorHex) where.patternColorHex = patternColorHex;
    if (emoji) where.image = emoji; // image = emoji
    if (emojiX !== undefined) where.imageX = emojiX;
    if (emojiY !== undefined) where.imageY = emojiY;

    // Ищем совпадающий дизайн
    let design = await SocksDesign.findOne({ where });

    if (!design) {
      design = await SocksDesign.create({
        colorHex,
        patternName,
        patternColorHex,
        image: emoji,
        imageX: emojiX,
        imageY: emojiY,
        preview,
      });
    }

    const cartItem = await CartItem.create({
      user_id: userId,
      design_id: design.id,
      quantity: 1,
    });

    return cartItem;
  }

  static async updateQuantity(id, quantity) {
    try {
      return await CartItem.update({ quantity }, { where: { id } });
    } catch (error) {
      return error.message;
    }
  }

  static async deleteItem(id) {
    try {
      return await CartItem.destroy({ where: { id } });
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = CartService;
