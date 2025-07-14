import { sequelize } from '../../../config/db.js';

export const getAllProducts = async () => {
    const query = `SELECT * FROM "products"`;
    const [result] = await sequelize.query(query);

    return result[0];
};