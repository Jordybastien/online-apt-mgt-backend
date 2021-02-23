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
  deleteRequest,
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

router.delete('/:requestId', checkToken, deleteRequest);

export default router;
