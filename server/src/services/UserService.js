const { User, Cart, CartItem, SocksDesign, Color, Image, Pattern } = require('../db/models');

class UserService {
  // Создание пользователя
  static async createUser(data) {
    try {
      const user = await User.create(data);
      return user.get();   // корректно
    } catch (error) {
      throw new Error(error.message); // бросаем ошибку!
    }
  }

  // Поиск по email
  static async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) return null;   // ВАЖНО!

      return user.get();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Получение корзины пользователя
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
                    as: 'design',
                    include: [{ model: Color }, { model: Image }, { model: Pattern }],
                  },
                ],
              },
            ],
          },
        ],
      });

      return user?.cart || null;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;
