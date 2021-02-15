import { Router } from 'express';
import AuthRoutes from './authRoutes';
import ApartmentRoutes from './apartmentRoutes';

const router = new Router();

router.use('/auth', AuthRoutes);

router.use('/apartment', ApartmentRoutes);

export default router;
