import { placeOrder, getOrderDetails, getOrdersByUser } from "./services/order_service.js"
import { getUserIdFromToken, findUserDetails } from '../auth/services/auth_service.js';
import { sendOrderConfirmation } from "../communication/mail_service.js";

// Error messages
const UNAUTHORIZED_ERROR = 'Unauthorized: user ID missing';
const CART_ARRAY_ERROR = 'Cart must be a non empty array';
const SHIPPING_DETAILS_ERROR = 'Missing shipping details';
const PAYMENT_METHOD_ERROR = 'Missing payment method';
const ORDER_ID_REQUIRED_ERROR = 'Order ID is required';
const USER_ID_REQUIRED_ERROR = 'User ID is required';
const PLACE_ORDER_ERROR = 'Failed to place order';
const ORDER_DETAILS_ERROR = 'Failed to retrieve order details';
const USER_ORDERS_ERROR = 'Failed to fetch orders for the user';

export const createOrder = async (req, res) => {
    try {
        const { cart, shippingInfo, paymentInfo } = req.body;
        const user_id = getUserIdFromToken(req);

        if (!user_id) {
            return res.status(401).json({ error: UNAUTHORIZED_ERROR });
        }

        if (!Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: CART_ARRAY_ERROR });
        }

        if (!shippingInfo?.address || !shippingInfo?.method) {
            return res.status(400).json({ error: SHIPPING_DETAILS_ERROR });
        }

        if (!paymentInfo?.method) {
            return res.status(400).json({ error: PAYMENT_METHOD_ERROR });
        }

        const result = await placeOrder(user_id, cart, shippingInfo, paymentInfo);
        const userEmail = await findUserDetails({ field: 'user_id', value: user_id, select: 'email' });

        const emailBody = `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                <h2 style="color: #4CAF50;">Thank you for your order!</h2>
                <p style="font-size: 16px;">Your order <strong style="color: #555;">ORD-${result.order_id.slice(0, 8).toUpperCase()}</strong> has been placed successfully.</p>
                
                <table style="width: 100%; max-width: 500px; border-collapse: collapse; margin: 20px 0;">
                <tr>
                    <td style="padding: 10px; border: 1px solid #eee;"><strong>Total Items:</strong></td>
                    <td style="padding: 10px; border: 1px solid #eee;">${cart.length}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #eee;"><strong>Total Amount:</strong></td>
                    <td style="padding: 10px; border: 1px solid #eee;">Rs ${result.total}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #eee;"><strong>Tracking ID:</strong></td>
                    <td style="padding: 10px; border: 1px solid #eee;">${result.tracking_id}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #eee;"><strong>Order Date:</strong></td>
                    <td style="padding: 10px; border: 1px solid #eee;">${new Date(result.order_date).toLocaleString()}</td>
                </tr>
                </table>

                <p style="font-size: 14px;">We will notify you once your order is shipped.</p>
                <p style="font-size: 14px;">If you have any questions, feel free to contact our support.</p>
                
                <p style="margin-top: 30px; font-size: 12px; color: #888;">This is an automated message. Please do not reply.</p>
            </div>
            `;


        sendOrderConfirmation(userEmail.email, "Order Confirmation", emailBody);
        return res.status(201).json(result);


    } catch (err) {
        return res.status(500).json({ error: PLACE_ORDER_ERROR, detail: err.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { order_id } = req.params;
        const user_id = getUserIdFromToken(req);
        if (!order_id) {
            return res.status(400).json({ error: ORDER_ID_REQUIRED_ERROR });
        }

        const orderDetails = await getOrderDetails(order_id, user_id);
        return res.status(200).json(orderDetails);

    } catch (error) {
        return res.status(500).json({ error: ORDER_DETAILS_ERROR });
    }
};

export const getOrdersByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ error: USER_ID_REQUIRED_ERROR });
        }

        const orders = await getOrdersByUser(user_id);
        return res.status(200).json({ orders });

    } catch (error) {
        return res.status(500).json({ error: USER_ORDERS_ERROR });
    }
};