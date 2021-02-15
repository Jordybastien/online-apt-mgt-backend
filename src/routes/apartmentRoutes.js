import { Router } from 'express';
import ApartmentController from '../controllers/apartmentController';
import {
  newAppartmentValidation,
  validator,
} from '../middlewares/authValidations';
import AuthMiddleware from '../middlewares/isAuth';
import RoleValidation from '../middlewares/roleValidation';

const { checkToken } = AuthMiddleware;

const { recordApartment, fetchAllApartments } = ApartmentController;

const { isAdmin } = RoleValidation;

const router = new Router();

router.post(
  '/',
  checkToken,
  isAdmin,
  newAppartmentValidation,
  validator,
  recordApartment
);

router.get('/', fetchAllApartments);

export default router;
