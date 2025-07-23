import express from 'express';
import { createOrder, getOrderById, getOrdersByUserId } from './order_controller.js'
import { verifyToken } from '../auth/auth_middleware.js';

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/user/:user_id', verifyToken, getOrdersByUserId);
router.get('/:order_id', verifyToken, getOrderById);


export default router;