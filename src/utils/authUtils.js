import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Response from './responseHandler';
import UserService from '../services/userServices';

dotenv.config();
const { JWT_SECRET } = process.env;
const SaltRounds = 8;

const response = new Response();

const { findUserByEmail } = UserService;

export default class AuthUtils {
  static async checkUserExists(req, res, next) {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      response.setError(401, `User with email ${email} already exists`);
      return response.send(res);
    }
    next();
  }

  static jwtSign(payload, time = '24h') {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: time });
  }

  static jwtVerify(token) {
    return jwt.verify(token, JWT_SECRET);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SaltRounds));
  }
}
