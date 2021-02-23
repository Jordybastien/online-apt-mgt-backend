import database from '../database/models';

/**
 * @class RequestService
 * @description Request Service methods
 */
class RequestService {
  /**
   *
   * @param {Object} newRequest
   * @returns {Object} newUser
   */
  static async addRequest(newRequest) {
    try {
      const addedRequest = await database.Request.create(newRequest);
      const { createdAt, updatedAt, ...cleanData } = addedRequest.dataValues;
      return cleanData;
    } catch (e) {
      throw Error(e);
    }
  }

  static async findRequestByDescription(description) {
    try {
      const findRequest = await database.Request.findOne({
        where: { description },
        raw: true,
      });
      if (!findRequest) return null;
      return findRequest;
    } catch (error) {
      throw Error(error);
    }
  }

  static async findRequestByUserId(userId) {
    try {
      const findRequest = await database.Request.findAll({
        where: { userId },
        raw: true,
      });
      if (!findRequest) return null;
      return findRequest;
    } catch (error) {
      throw Error(error);
    }
  }

  static async deleteRequestById(id) {
    try {
      const deletedRequest = await database.Request.destroy({
        where: { id },
      });
      return deletedRequest;
    } catch (error) {
      throw Error(error);
    }
  }

  static async findRequestById(requestId) {
    try {
      const findRequest = await database.Request.findOne({
        where: { id: requestId },
        raw: true,
      });
      if (!findRequest) return null;
      return findRequest;
    } catch (error) {
      throw Error(error);
    }
  }

  static async getAllRequests() {
    try {
      const requests = await database.Request.findAll({
        include: [
          {
            model: database.User,
            attributes: ['names'],
            required: true,
            include: [
              {
                model: database.Apartment,
                attributes: ['name', 'address'],
                required: true,
              },
            ],
          },
        ],
      });
      return requests;
    } catch (error) {
      throw Error(error);
    }
  }

  static async alteredGetAllRequests() {
    try {
      const requests = await database.Request.findAll({
        include: [
          {
            model: database.User,
            attributes: ['names'],
            required: true,
            include: [
              {
                model: database.Apartment,
                attributes: ['name', 'address'],
                required: true,
              },
            ],
          },
        ],
      });
      return requests;
    } catch (error) {
      throw Error(error);
    }
  }

  static async changeRequestStatus(requestId, newRequest) {
    try {
      const request = await database.Request.update(newRequest, {
        where: { id: requestId },
      });
      return request;
    } catch (error) {
      throw Error(error);
    }
  }
}

export default RequestService;
