import express from 'express';
import { createDB, sequelize } from './config/db.js';
import cors from 'cors';
import authRoutes from './app_modules/auth/auth_route.js';
import productRoutes from './app_modules/product/product_route.js'

// await initUserTable();
await createDB();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
//For now allowing all regions
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

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
