import { sequelize } from '../../../config/db.js';

export const getAllProducts = async () => {
    const query = `SELECT * FROM "products"`;
    const [rows] = await sequelize.query(query);

    return rows;
};