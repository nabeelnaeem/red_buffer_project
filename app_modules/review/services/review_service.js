import { sequelize } from '../../../config/db.js';

export const hasPurchasedProduct = async (user_id, product_id) => {
    const query = `
        SELECT 1
        FROM orders o 
        LEFT JOIN order_item oi ON o.order_id = oi.order_id
        WHERE o.user_id = :user_id AND oi.product_id = :product_id
        LIMIT 1
    `;
    const [result] = await sequelize.query(query, {
        replacements: { user_id, product_id },
    });
    return result.length > 0;
};

export const getReviewIfAny = async (user_id, product_id) => {
    const [reviewResult] = await sequelize.query(`
            SELECT rating, comment FROM reviews
            WHERE user_id = :user_id AND product_id = :product_id
            LIMIT 1
        `, {
        replacements: { user_id, product_id }
    });

    if (reviewResult.length > 0) {
        return reviewResult[0];
    }
    else {
        return null;
    }
}

export const createProductReview = async (user_id, product_id, order_item_id, rating, comment) => {
    try {
        const [existingReview] = await sequelize.query(`
            SELECT review_id FROM reviews
            WHERE user_id = :user_id AND product_id = :product_id
        `, {
            replacements: { user_id, product_id }
        });

        if (existingReview.length > 0) {
            throw new Error('You have already reviewed this product');
        }

        if (!order_item_id) {
            const [rows] = await sequelize.query(`
                SELECT oi.order_item_id
                FROM order_item oi
                LEFT JOIN orders o ON o.order_id = oi.order_id
                WHERE oi.product_id = :product_id AND o.user_id = :user_id
                ORDER BY oi."createdAt" DESC
                LIMIT 1;
            `, { replacements: { user_id, product_id } });

            if (!rows.length) throw new Error('No recent purchase found for this product');

            order_item_id = rows[0].order_item_id;
        }
        const [result] = await sequelize.query(`
            INSERT INTO reviews (review_id, user_id, product_id, order_item_id, rating, comment, "createdAt", "updatedAt")
            VALUES (gen_random_uuid(), :user_id, :product_id, :order_item_id, :rating, :comment, NOW(), NOW())
            RETURNING *;
        `, {
            replacements: { user_id, product_id, order_item_id, rating, comment }
        });

        return result[0];
    } catch (err) {
        throw err;
    }
};

export const updateProductReview = async (user_id, product_id, rating, comment) => {
    const [result] = await sequelize.query(`
        UPDATE reviews
        SET rating = :rating,
            comment = :comment,
            "updatedAt" = NOW()
        WHERE user_id = :user_id AND product_id = :product_id
        RETURNING *;
    `, {
        replacements: { user_id, product_id, rating, comment }
    });

    if (!result.length) throw new Error('Review not found to update');

    return result[0];
};
