import express from 'express';
import { createOrder, getOrderById } from './order_controller.js'

const router = express.Router();

router.post('/', createOrder);
router.get('/:order_id', getOrderById);


export default router;