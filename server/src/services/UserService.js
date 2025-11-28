const { User, Cart, CartItem, SocksDesign, Color, Image, Pattern } = require('../db/models');

class UserService {
  static async createUser(data) {
    try {
      const user = await User.create(data);
      // delete user.password;
      return user.get();
    } catch (error) {
      return error.message;
    }
  }
  static async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user.get();
    } catch (error) {
      return error.message;
    }
  }

  static async getUserCart(userId) {
    try {
      const items = await CartItem.findAll({
        where: { user_id: userId },
        include: [{ model: SocksDesign, as: 'design' }],
        order: [['id', 'DESC']],
      });

      return items;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = UserService;
