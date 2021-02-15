import database from '../database/models';

/**
 * @class RoleService
 * @description user service methods
 */

class RoleService {
  /**
   *
   * @param {Object} roleValue
   * @returns {Object} user
   */
  static async findRoleByValue(roleValue) {
    const role = await database.Role.findOne({
      where: { roleValue },
      raw: true,
    });
    if (!role) return null;
    return role;
  }
}

export default RoleService;
