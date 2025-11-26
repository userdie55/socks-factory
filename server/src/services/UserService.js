const { User } = require('../db/models');

class UserService {
  static async createUser(data) {
    try {
      const user = await User.create(data);
      delete user.password;
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
}

module.exports = UserService;
