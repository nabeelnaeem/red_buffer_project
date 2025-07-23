import { hasPurchasedProduct, createProductReview, updateProductReview, getReviewIfAny } from "./services/review_service.js"
import { getUserIdFromToken } from '../auth/services/auth_service.js';

// Error messages
const UNAUTHORIZED_ERROR = 'Unauthorized: user ID missing';
const PRODUCT_ID_REQUIRED_ERROR = 'Product ID is required';
const PURCHASE_CHECK_ERROR = 'Failed to check purchase status';
const PRODUCT_RATING_REQUIRED_MSG = 'product_id and rating are required';

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
        let review = null;
        if (hasPurchased) {
            review = await getReviewIfAny(user_id, product_id)
        }

        return res.status(200).json({ hasPurchased, review })
    }
    catch (error) {
        return res.status(500).json({ error: PURCHASE_CHECK_ERROR });
    }
};

export const createReview = async (req, res) => {
    const { product_id, rating, comment, order_item_id } = req.body;
    const user_id = getUserIdFromToken(req);

    if (!product_id || !rating) {
        return res.status(400).json({ error: PRODUCT_RATING_REQUIRED_MSG });
    }
    try {
        const review = await createProductReview(user_id, product_id, order_item_id, rating, comment);
        res.status(201).json({
            message: 'Review submitted',
            review: {
                rating: review.rating,
                comment: review.comment
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const updateReview = async (req, res) => {
    const { product_id, rating, comment } = req.body;
    const user_id = getUserIdFromToken(req);

    if (!product_id || !rating) {
        return res.status(400).json({ error: PRODUCT_RATING_REQUIRED_MSG });
    }

    try {
        const review = await updateProductReview(user_id, product_id, rating, comment);
        return res.status(200).json({
            message: 'Review updated successfully',
            review: {
                rating: review.rating,
                comment: review.comment
            }
        });
    } catch (err) {
        console.error('Update Review Error:', err.message);
        return res.status(400).json({ error: err.message });
    }
};