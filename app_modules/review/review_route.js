import express from 'express';
import { checkIfUserPurchasedProduct, createReview, updateReview } from './review_controller.js'
import { verifyToken } from '../auth/auth_middleware.js';

const router = express.Router();

router.get('/has-purchased/:product_id', checkIfUserPurchasedProduct);
router.post('/', verifyToken, createReview);
router.put('/', verifyToken, updateReview);
export default router;