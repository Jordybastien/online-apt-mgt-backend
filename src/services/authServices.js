import database from '../database/models';

/**
 * @class UserService
 * @description user service methods
 */
class AuthService {
  /**
   *
   * @param {Object} newUser
   * @returns {Object} newUser
   */
  static async addUser(newUser) {
    try {
      const addedUser = await database.User.create(newUser);
      const {
        password,
        createdAt,
        updatedAt,
        ...cleanedUser
      } = addedUser.dataValues;
      return cleanedUser;
    } catch (e) {
      throw Error(e);
    }
  }
}

export default AuthService;
