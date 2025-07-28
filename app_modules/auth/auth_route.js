import express from 'express';
import { signup, login, revoke, profile, updateProfile, refreshAccessToken, logout } from './auth_controller.js';
import { verifyToken } from './auth_middleware.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh-token', verifyToken, refreshAccessToken);
router.post('/logout', verifyToken, logout);
router.put('/revoke', verifyToken, revoke);
router.get('/profile', verifyToken, profile);
router.put('/profile', verifyToken, updateProfile);
export default router;