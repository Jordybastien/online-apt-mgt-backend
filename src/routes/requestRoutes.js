import { Router } from 'express';
import AuthMiddleware from '../middlewares/isAuth';
import RoleValidation from '../middlewares/roleValidation';
import RequestController from '../controllers/requestController';
import {
  newRequest,
  validator,
  checkStatus,
} from '../middlewares/authValidations';

const { checkToken } = AuthMiddleware;

const { isAdmin, isClient, isTechnician } = RoleValidation;

const {
  recordRequest,
  fetchRequests,
  alterRequest,
  newFetchRequests,
} = RequestController;

const router = new Router();

router.post('/', checkToken, isClient, newRequest, validator, recordRequest);

router.get('/', checkToken, fetchRequests);
router.get('/all', checkToken, newFetchRequests);

router.patch(
  '/:requestId',
  checkToken,
  checkStatus,
  isTechnician,
  alterRequest
);

export default router;
