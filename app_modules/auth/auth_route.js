import express from 'express';
import { signup, login, revoke, profile } from '../controllers/auth_controller.js';
import { verifyToken } from '../middleware/auth_middleware.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/revoke', revoke);

//protected route
router.get('/profile', verifyToken, profile);
export default router;