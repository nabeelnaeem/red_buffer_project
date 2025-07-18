import express from 'express';
import { signup, login, revoke, profile, updateProfile } from './auth_controller.js';
import { verifyToken } from './auth_middleware.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.put('/revoke', verifyToken, revoke);

//protected route
router.get('/profile', verifyToken, profile);
router.put('/profile', verifyToken, updateProfile);
export default router;