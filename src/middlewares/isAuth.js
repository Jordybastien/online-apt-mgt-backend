import redisClient from '../utils/redisConnection';
import UserService from '../services/userServices';
import Response from '../utils/responseHandler';
import AuthUtils from '../utils/authUtils';

const response = new Response();

const { findUserByEmail } = UserService;

const { jwtVerify } = AuthUtils;

export default class Authentication {
  static async checkToken(req, res, next) {
    try {
      const token =
        req.params.token || req.header('Authorization').replace('Bearer ', '');
      const payload = jwtVerify(token);
      const searchUser = await findUserByEmail(payload.email);
      redisClient.get(payload.email, (err, reply) => {
        if (token === reply) {
          response.setError(401, 'Please Login');
          return response.send(res);
        }
        if (!searchUser) {
          response.setError(404, 'Email is not registered');
          return response.send(res);
        }
        const {
          password,
          createdAt,
          updatedAt,
          deletedAt,
          ...cleandedUser
        } = searchUser;
        if (cleandedUser) {
          cleandedUser.Role = cleandedUser.Role.dataValues;
          cleandedUser.Apartment = cleandedUser.Apartment.dataValues;
        }
        req.user = cleandedUser;
        req.token = token;
        next();
      });
    } catch (er) {
      response.setError(400, 'Invalid token');
      return response.send(res);
    }
  }
}
