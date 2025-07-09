import express from 'express';
import { signup, login, revoke, profile } from './auth_controller.js';
import { verifyToken } from './auth_middleware.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.put('/revoke', revoke);

//protected route
router.get('/profile', verifyToken, profile);
export default router;