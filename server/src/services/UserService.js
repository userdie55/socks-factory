const { User, Cart, CartItem, SocksDesign } = require('../db/models');

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

  static async getUserCart(user_id) {
    try {
      const user = await User.findByPk(user_id, {
        include: [
          {
            model: Cart,
            as: 'cart',
            include: [
              {
                model: CartItem,
                as: 'items',
                include: [
                  {
                    model: SocksDesign,
                    as: 'design'
                  }
                ]
              },
            ],
          },
        ],
      });
      return user?.cart || null;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = UserService;
