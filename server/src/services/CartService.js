const { CartItem } = require('../db/models');

class CartService {
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
