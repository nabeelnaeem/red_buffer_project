import { placeOrder } from "./services/order_service.js"
import { getUserIdFromToken } from '../auth/services/auth_service.js';
export const createOrder = async (req, res) => {
    try {
        const { cart, shippingInfo, paymentInfo } = req.body;
        const user_id = getUserIdFromToken(req);

        if (!user_id) {
            return res.status(401).json({ error: 'Unauthorize: user ID missing' });
        }

        if (!Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: 'Cart must be a non empty array' });
        }

        if (!shippingInfo?.address || !shippingInfo?.method) {
            return res.status(400).json({ error: 'Missing shipping details' });
        }

        if (!paymentInfo?.method) {
            return res.status(400).json({ error: 'Missing payment method' });
        }

        const result = await placeOrder(user_id, cart, shippingInfo, paymentInfo);

        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to place order', detail: err.message });
    }
};