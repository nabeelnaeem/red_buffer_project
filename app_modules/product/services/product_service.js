import { sequelize } from '../../../config/db.js';

const TABLE_NAME = "products";

export const getAllProducts = async ({ name, sortBy = 'name', sortOrder = 'asc', page = 1, limit = 10 }) => {
    const allowedSortFields = ['name', 'price', 'stock', 'createdAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'name';
    const sortDirection = sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    const offset = (page - 1) * limit;

    const replacements = { limit, offset };
    let baseQuery = `
        FROM products p
        JOIN categories c ON p.category_id = c.category_id
        LEFT JOIN reviews r ON p.product_id = r.product_id
        `;
    if (name) {
        baseQuery += ` WHERE LOWER(p.name) LIKE :name`;
        replacements.name = `%${name.toLowerCase()}%`;
    }

    const query = `
                    SELECT 
                    p.*, 
                    c.name AS category,
                    ROUND(AVG(r.rating), 1) AS rating
                    ${baseQuery}
                    GROUP BY p.product_id, c.name
                    ORDER BY "${sortField}" ${sortDirection}
                    LIMIT :limit OFFSET :offset
                `;

    const countQuery = `SELECT COUNT(DISTINCT p.product_id) AS total
    ${baseQuery}
    `;

    const [[{ total }]] = await sequelize.query(countQuery, { replacements });
    const [products] = await sequelize.query(query, { replacements });

    return {
        products,
        total: parseInt(total),
        pages: Math.ceil(total / limit),
    };
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