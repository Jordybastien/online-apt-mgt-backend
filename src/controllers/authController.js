import Response from '../utils/responseHandler';
import RoleService from '../services/roleServices';
import AuthUtils from '../utils/authUtils';
import AuthService from '../services/authServices';
import UserService from '../services/userServices';

const { findRoleByValue } = RoleService;

const { hashPassword, jwtSign, comparePassword, jwtVerify } = AuthUtils;

const { addUser } = AuthService;

const { findUserByEmail } = UserService;

const response = new Response();

class AuthController {
  static async signupUser(req, res) {
    try {
      const {
        names,
        email,
        apartmentId,
        password,
        confirmPassword,
        isClient,
      } = req.body;
      if (password !== confirmPassword) {
        response.setError(401, 'Password missmatch');
        return response.send(res);
      }
      const { id: roleId } = await findRoleByValue(
        JSON.parse(isClient) ? 0 : 1
      );

      const newUser = await addUser({
        names,
        email,
        password: hashPassword(password),
        apartmentId,
        roleId,
      });
      response.setSuccess(201, 'Account Created successfuly!', newUser);
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message || 'Something went wrong');
      return response.send(res);
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password: userPassword } = req.body;
      const userLogin = await findUserByEmail(email);
      if (!userLogin) {
        response.setError(404, `User with email ${email} not found`);
        return response.send(res);
      }

      const checkPassword = comparePassword(userPassword, userLogin.password);
      if (!checkPassword) {
        response.setError(401, 'Invalid User credentials');
        return response.send(res);
      }

      const { password, createdAt, updatedAt, ...cleanedLogin } = userLogin;

      response.setSuccess(200, 'User logged in successfuly!', {
        user: cleanedLogin,
        token: jwtSign(cleanedLogin),
      });
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message || 'Something went wrong');
      return response.send(res);
    }
  }
}

export default AuthController;
