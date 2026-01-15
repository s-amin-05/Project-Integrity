import express from 'express';
import authRoutes from './authRoutes.js';
import reportRoutes from './reportRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/reports', reportRoutes);

export default router;