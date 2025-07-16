import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "./product_controller.js"

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;