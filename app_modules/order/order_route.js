import express from 'express';
import { createOrder } from './order_controller.js'

const router = express.Router();

router.post('/', createOrder);

export default router;