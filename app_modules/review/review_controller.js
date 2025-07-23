import { hasPurchasedProduct } from "./services/review_service.js"
import { getUserIdFromToken } from '../auth/services/auth_service.js';

// Error messages
const UNAUTHORIZED_ERROR = 'Unauthorized: user ID missing';
const PRODUCT_ID_REQUIRED_ERROR = 'Product ID is required';
const PURCHASE_CHECK_ERROR = 'Failed to check purchase status';

export const checkIfUserPurchasedProduct = async (req, res) => {
    try {
        const user_id = getUserIdFromToken(req);
        const { product_id } = req.params;

        if (!user_id) {
            return res.status(401).json({ error: UNAUTHORIZED_ERROR });
        }

        if (!product_id) {
            return res.status(400).json({ error: PRODUCT_ID_REQUIRED_ERROR });
        }

        const hasPurchased = await hasPurchasedProduct(user_id, product_id);
        return res.status(200).json({ hasPurchased })
    }
    catch (error) {
        return res.status(500).json({ error: PURCHASE_CHECK_ERROR });
    }
};