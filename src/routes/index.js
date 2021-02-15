import { Router } from 'express';
import AuthRoutes from './authRoutes';
import ApartmentRoutes from './apartmentRoutes';
import RequestRoute from './requestRoutes';

const router = new Router();

router.use('/auth', AuthRoutes);

router.use('/apartment', ApartmentRoutes);

router.use('/request', RequestRoute);

export default router;
