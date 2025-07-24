import express from 'express';
import { sequelize } from './config/db.js';
import cors from 'cors';
import authRoutes from './app_modules/auth/auth_route.js';
import productRoutes from './app_modules/product/product_route.js';
import orderRoutes from './app_modules/order/order_route.js';
import reviewRoutes from './app_modules/review/review_route.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true //Allow the browser to include "credentials" like cookies, authorization headers, or TLS client certificates in a cross-origin request.
}));
// app.use(cors());
//For now allowing all regions
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

// DB Connection & Server Start
sequelize.authenticate()
    .then(() => {
        console.log('DB Connected');
        app.listen(PORT, () => {
            console.log(` Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error(' DB Connection Failed:', err);
    });
