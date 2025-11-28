// src/controllers/CartController.js

const { Cart, SocksDesign } = require('../db/models');

class CartController {
  // GET /api/cart
  static async getCart(req, res) {
    try {
      const userId = req.user.id;

      // на всякий случай создаём корзину, если её ещё нет
      const [cart] = await Cart.findOrCreate({
        where: { user_id: userId },
        defaults: { user_id: userId },
      });

      const fullCart = await Cart.findByPk(cart.id, {
        include: [{ model: SocksDesign, as: 'items' }],
      });

      return res.status(200).json(fullCart.items ?? []);
    } catch ({ message }) {
      console.log(message);
      return res.status(500).json({ error: message });
    }
  }

  // POST /api/cart
  // в body тоже приходит ВЕСЬ объект дизайна
  static async addToCart(req, res) {
    try {
      const userId = req.user.id;
      const design_json = req.body;

      if (!design_json) {
        return res.status(400).json({ error: 'No design data provided' });
      }

      const [cart] = await Cart.findOrCreate({
        where: { user_id: userId },
        defaults: { user_id: userId },
      });

      const design = await SocksDesign.create({
        user_id: userId,
        cart_id: cart.id,
        design_json,
      });

      return res.status(201).json(design);
    } catch ({ message }) {
      console.log(message);
      return res.status(500).json({ error: message });
    }
  }

  // DELETE /api/cart/:id  (id = id дизайна в корзине)
  static async deleteItem(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params; // id дизайна

      const design = await SocksDesign.findOne({
        where: { id, user_id: userId },
      });

      if (!design || !design.cart_id) {
        return res.status(404).json({ error: 'Item not found in cart' });
      }

      // можно либо удалять, либо просто отвязать от корзины:
      // await design.update({ cart_id: null });
      await design.destroy();

      return res.status(200).json({ message: 'Item removed' });
    } catch ({ message }) {
      console.log(message);
      return res.status(500).json({ error: message });
    }
  }
}

module.exports = CartController;
