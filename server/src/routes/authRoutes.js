import express from 'express';
import { login } from '../controllers/authController.js';
import firebaseAuth from '../middleware/firebaseAuth.js';

const router = express.Router();

router.post('/login', firebaseAuth, login);

export default router;
