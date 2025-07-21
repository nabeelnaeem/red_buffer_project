import { sequelize } from '../../../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const placeOrder = async (user_id, cart, shippingInfo, paymentInfo) => {
    const t = await sequelize.transaction();

    try {
        const order_id = uuidv4();
        const [orderResult] = await sequelize.query(
            `INSERT INTO orders (order_id, user_id, date, status, amount, "createdAt", "updatedAt")
             VALUES (:order_id, :user_id, NOW(), 'pending', 0, NOW(), NOW())
             RETURNING *`,
            { replacements: { order_id, user_id }, transaction: t }
        );

        let productTotal = 0;

        for (const item of cart) {
            const [productResult] = await sequelize.query(
                `SELECT price, stock, name FROM products 
                 WHERE product_id = :product_id AND "deletedAt" IS NULL`,
                { replacements: { product_id: item.product_id }, transaction: t }
            );

            if (!productResult.length)
                throw new Error(`Product not found`);

            const { price, stock, name } = productResult[0];

            if (stock < item.quantity)
                throw new Error(`Insufficient stock for ${name}`);

            const amount = price * item.quantity;
            productTotal += amount;

            await sequelize.query(
                `INSERT INTO order_item (order_item_id, order_id, product_id, quantity, amount, "createdAt", "updatedAt")
                 VALUES (gen_random_uuid(), :order_id, :product_id, :quantity, :amount, NOW(), NOW())`,
                {
                    replacements: {
                        order_id,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        amount
                    },
                    transaction: t
                }
            );

            await sequelize.query(
                `UPDATE products SET stock = stock - :qty, "updatedAt" = NOW()
                 WHERE product_id = :product_id`,
                {
                    replacements: {
                        qty: item.quantity,
                        product_id: item.product_id
                    },
                    transaction: t
                }
            );
        }

        // Final total = product total + shipping fee
        const shippingFee = shippingInfo.shipping_fee || 0;
        const total = productTotal + shippingFee;

        // Shipping
        const tracking_id = `TRK-${uuidv4().slice(0, 8).toUpperCase()}`;
        await sequelize.query(
            `INSERT INTO shippings (shipping_id, order_id, address, method, tracking_id, status, "createdAt", "updatedAt")
             VALUES (gen_random_uuid(), :order_id, :address, :method, :tracking_id, 'pending', NOW(), NOW())`,
            {
                replacements: {
                    order_id,
                    address: shippingInfo.address,
                    method: shippingInfo.method,
                    tracking_id
                },
                transaction: t
            }
        );

        // Payment
        await sequelize.query(
            `INSERT INTO payments (payment_id, order_id, date, method, amount, status, "createdAt", "updatedAt")
             VALUES (gen_random_uuid(), :order_id, NOW(), :method, :amount, :status, NOW(), NOW())`,
            {
                replacements: {
                    order_id,
                    method: paymentInfo.method,
                    amount: total,
                    status: paymentInfo.status || 'pending'
                },
                transaction: t
            }
        );

        await sequelize.query(
            `UPDATE orders SET amount = :total, "updatedAt" = NOW()
             WHERE order_id = :order_id`,
            {
                replacements: { total, order_id },
                transaction: t
            }
        );

        const [userResult] = await sequelize.query(
            `SELECT full_name, address, phone FROM users WHERE user_id = :user_id`,
            { replacements: { user_id }, transaction: t }
        );

        const user = userResult[0];
        const updates = [];

        if (!user.full_name && shippingInfo.full_name)
            updates.push(`full_name = :full_name`);
        if (!user.address && shippingInfo.address)
            updates.push(`address = :address`);
        if (!user.phone && shippingInfo.phone)
            updates.push(`phone = :phone`);

        if (updates.length > 0) {
            await sequelize.query(
                `UPDATE users SET ${updates.join(', ')}, "updatedAt" = NOW()
                 WHERE user_id = :user_id`,
                {
                    replacements: {
                        user_id,
                        full_name: shippingInfo.full_name,
                        address: shippingInfo.address,
                        phone: shippingInfo.phone
                    },
                    transaction: t
                }
            );
        }

        await t.commit();
        return {
            success: true,
            order_id,
            tracking_id,
            total
        };

    } catch (err) {
        await t.rollback();
        throw err;
    }
};
