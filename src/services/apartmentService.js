import database from '../database/models';

/**
 * @class ApartmentService
 * @description Apartment Service methods
 */
class ApartmentService {
  /**
   *
   * @param {Object} newApartment
   * @returns {Object} newUser
   */
  static async addApartment(newApartment) {
    try {
      const addedApartment = await database.Apartment.create(newApartment);
      const { createdAt, updatedAt, ...cleanData } = addedApartment.dataValues;
      return cleanData;
    } catch (e) {
      throw Error(e);
    }
  }

  static async findApartmentByNameAndAddress(name, address) {
    try {
      const findApartment = await database.Apartment.findOne({
        where: { name, address },
      });
      if (!findApartment) return null;
      return findApartment.dataValues;
    } catch (error) {
      throw Error(error);
    }
  }

  static async getAllAPartments() {
    try {
      const apartments = await database.Apartment.findAll({ raw: true });
      return apartments;
    } catch (error) {
      throw Error(error);
    }
  }
}

export default ApartmentService;
