import express from 'express';
import authRoutes from './app_modules/auth/auth_route.js';
import { createDB, sequelize } from './config/db.js';

// await initUserTable();
await createDB();
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

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
