const CartService = require('../services/CartService');

class CartController {
  static async addToCart(req, res) {
    try {
      const userId = req.user?.id || req.body.user_id;
      if (!userId) return res.status(400).json({ message: "User id required" });

      const designData = req.body;

      const cartItem = await CartService.addToCart(userId, designData);

      res.json(cartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateQuantity(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({ error: 'Quantity must be >= 1' });
      }

      await CartService.updateQuantity(id, quantity);

      return res.status(200).json({ message: 'Quantity updated' });
    } catch ({ message }) {
      return res.status(500).json({ error: message });
    }
  }

  static async deleteItem(req, res) {
    try {
      const { id } = req.params;
      await CartService.deleteItem(id);
      return res.status(200).json({ message: 'Item removed' });
    } catch ({ message }) {
      return res.status(500).json({ error: message });
    }
  }
}

module.exports = CartController;
