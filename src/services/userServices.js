import database from '../database/models';

/**
 * @class UserService
 * @description user service methods
 */

class UserService {
  /**
   *
   * @param {Object} userEmail
   * @returns {Object} user
   */
  static async findUserByEmail(userEmail) {
    try {
      const user = await database.User.findOne({
        where: { email: userEmail },
        attributes: {
          exclude: ['roleId', 'apartmentId'],
        },
        include: [
          {
            model: database.Role,
            attributes: ['roleValue', 'roleName'],
            required: true,
          },
          {
            model: database.Apartment,
            attributes: ['id', 'name', 'address'],
            required: true,
          },
        ],
      });
      if (!user) return null;
      return user.dataValues;
    } catch (error) {
      throw Error(error);
    }
  }
}

export default UserService;
