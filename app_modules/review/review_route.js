import express from 'express';
import { checkIfUserPurchasedProduct } from './review_controller.js'
import { verifyToken } from '../auth/auth_middleware.js';

const router = express.Router();

router.get('/has-purchased/:product_id', checkIfUserPurchasedProduct);

export default router;