import { Router } from 'express';
import AuthController from '../controllers/authController';
import {
  loginValidation,
  signupValidation,
  validator,
} from '../middlewares/authValidations';
import AuthUtils from '../utils/authUtils';

const { loginUser, signupUser } = AuthController;

const { checkUserExists } = AuthUtils;

const router = new Router();

router.post(
  '/signup',
  signupValidation,
  validator,
  checkUserExists,
  signupUser
);

router.post('/login', loginValidation, validator, loginUser);

export default router;
