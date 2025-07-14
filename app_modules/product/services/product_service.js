import { sequelize } from '../../../config/db.js';

const TABLE_NAME = "products";

export const getAllProducts = async () => {
    const query = `SELECT * FROM ${TABLE_NAME}`;
    const [rows] = await sequelize.query(query);
    return rows;
};

export const getProductById = async (product_id) => {
    const query = `SELECT * FROM ${TABLE_NAME} WHERE product_id = :product_id`;
    const [result] = await sequelize.query(query, {
        replacements: { product_id }
    });
    return result[0];
}

export const updateProduct = async (product_id, data) => {
    const query = `UPDATE ${TABLE_NAME} 
                    SET 
                        name = :name, 
                        description = :description,
                        stock = :stock,
                        price = :price,
                        image_url = :image_url,
                        category_id = :category_id,
                        "updatedAt" = NOW()
                    WHERE product_id = :product_id
                    RETURNING *;
                    `;
    const replacements = {
        product_id,
        name: data.name,
        description: data.description,
        stock: data.stock,
        price: data.price,
        image_url: data.image_url,
        category_id: data.category_id
    };

    const [result] = await sequelize.query(query, { replacements });
    return result[0];
};