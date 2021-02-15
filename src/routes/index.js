import { Router } from 'express';
import AuthRoutes from './authRoutes';

const router = new Router();

router.use('/auth', AuthRoutes);

export default router;
