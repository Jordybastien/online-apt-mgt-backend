import Response from '../utils/responseHandler';

const response = new Response();

class RoleValidation {
  static async isAdmin(req, res, next) {
    if (req.user.Role.roleValue === 2) {
      next();
    } else {
      response.setError(
        401,
        'You do not have the privillege to make this request'
      );
      return response.send(res);
    }
  }

  static async isClient(req, res, next) {
    if (req.user.Role.roleValue === 0) {
      next();
    } else {
      response.setError(
        401,
        'You do not have the privillege to make this request'
      );
      return response.send(res);
    }
  }

  static async isTechnician(req, res, next) {
    if (req.user.Role.roleValue === 1) {
      next();
    } else {
      response.setError(
        401,
        'You do not have the privillege to make this request'
      );
      return response.send(res);
    }
  }
}

export default RoleValidation;
