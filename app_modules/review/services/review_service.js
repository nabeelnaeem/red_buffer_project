import { sequelize } from '../../../config/db.js';

export const hasPurchasedProduct = async (user_id, product_id) => {
    const query = `
        SELECT 1
        FROM orders o 
        JOIN order_item oi ON o.order_id = oi.order_id
        WHERE o.user_id = :user_id AND oi.product_id = :product_id
        LIMIT 1
    `;
    const [result] = await sequelize.query(query, {
        replacements: { user_id, product_id },
    });
    return result.length > 0;
};
