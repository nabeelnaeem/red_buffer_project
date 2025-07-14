import { sequelize } from '../../../config/db.js';

const TABLE_NAME = "products";

export const getAllProducts = async (name) => {
    let query = `SELECT * FROM ${TABLE_NAME}`;
    const replacements = {};

    if (name) {
        query += ` WHERE LOWER(name) LIKE :name`;
        replacements.name = `%${name.toLowerCase()}%`;
    }

    const [rows] = await sequelize.query(query, { replacements });
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

export const createProduct = async (category_id, name, description, stock, price, image_url) => {
    const query = `
        INSERT INTO ${TABLE_NAME} (
            product_id, category_id, name, description, stock, price, image_url, "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), :category_id, :name, :description, :stock, :price, :image_url, NOW(), NOW())
        RETURNING *;
        
    `;

    const replacements = {
        category_id: category_id,
        name: name,
        description: description || null,
        stock: stock || 0,
        price: price || 0,
        image_url: image_url || null
    };

    const [result] = await sequelize.query(query, { replacements });
    return result[0];
};

export const deleteProduct = async (product_id) => {
    const query = `DELETE FROM ${TABLE_NAME} 
                    WHERE product_id = :product_id
    `;
    const replacements = {
        product_id
    }
    const [result] = await sequelize.query(query, { replacements });
    return result[0];
}

export const ifExistingProduct = async (product_id) => {
    const query = `SELECT * FROM ${TABLE_NAME} WHERE product_id = :product_id`;
    const [result] = await sequelize.query(query, {
        replacements: { product_id }
    });
    return result[0];
}