import { sequelize } from '../../../config/db.js';

const TABLE_NAME = "products";

export const getAllProducts = async ({
    name,
    sortBy = 'name',
    sortOrder = 'asc',
    page = 1,
    limit = 10,
    stock,
    rating
}) => {
    const allowedSortFields = ['name', 'price', 'stock', 'createdAt', 'rating'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'name';
    const sortDirection = sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    const offset = (page - 1) * limit;
    const replacements = { limit, offset };

    let baseQuery = `
        FROM ${TABLE_NAME} p
        LEFT JOIN categories c ON p.category_id = c.category_id
        LEFT JOIN reviews r ON p.product_id = r.product_id
        WHERE p."deletedAt" IS NULL
    `;

    if (name) {
        baseQuery += ` AND p.name ILIKE :name`;
        replacements.name = `%${name.toLowerCase()}%`;
    }

    if (stock === 'in') {
        baseQuery += ` AND p.stock > 0`;
    } else if (stock === 'out') {
        baseQuery += ` AND p.stock = 0`;
    }

    if (rating && !isNaN(rating)) {
        baseQuery += ` GROUP BY p.product_id, c.name HAVING ROUND(AVG(r.rating), 1) >= :rating`;
        replacements.rating = rating;
    } else {
        baseQuery += ` GROUP BY p.product_id, c.name`;
    }

    const query = `
        SELECT * FROM (
            SELECT 
                p.*, 
                c.name AS category_name,
                COALESCE(ROUND(AVG(r.rating), 1), 0) AS rating,
                COUNT(r.rating) AS rating_count
            ${baseQuery}
        ) AS sub
        ORDER BY ${sortField} ${sortDirection}
        LIMIT :limit OFFSET :offset
    `;

    const countQuery = `SELECT COUNT(*) AS total FROM (${query.replace('LIMIT :limit OFFSET :offset', '')}) AS count_sub`;

    const [[{ total }]] = await sequelize.query(countQuery, { replacements });
    const [products] = await sequelize.query(query, { replacements });

    return {
        products,
        total: parseInt(total),
        pages: Math.ceil(total / limit),
    };
};

export const getProductById = async (product_id) => {
    const productQuery = `
        SELECT 
            p.*, 
            c.name AS category_name,
            COALESCE(ROUND(AVG(r.rating), 1), 0) AS rating,
            COUNT(r.rating) AS rating_count
        FROM ${TABLE_NAME} p
        LEFT JOIN categories c ON p.category_id = c.category_id
        LEFT JOIN reviews r ON p.product_id = r.product_id
        WHERE p.product_id = :product_id AND p."deletedAt" IS NULL
        GROUP BY p.product_id, c.name
    `;

    const [productResult] = await sequelize.query(productQuery, {
        replacements: { product_id },
    });

    const product = productResult[0];
    if (!product) return null;

    const reviewsQuery = `
        SELECT 
            r.review_id,
            r.rating,
            r.comment,
            r."createdAt",
            r."updatedAt",
            u.full_name
        FROM reviews r
        LEFT JOIN users u ON r.user_id = u.user_id
        WHERE r.product_id = :product_id
        ORDER BY r."createdAt" DESC
    `;

    const [reviews] = await sequelize.query(reviewsQuery, {
        replacements: { product_id },
    });

    return {
        ...product,
        reviews,
    };
};


export const updateProduct = async (product_id, category_id, name, description, stock, price, image_url) => {
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
        name: name,
        description: description || '',
        stock: stock || 0,
        price: price || 0,
        image_url: image_url || '',
        category_id: category_id
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
        description: description || '',
        stock: stock || 0,
        price: price || 0,
        image_url: image_url || ''
    };

    const [result] = await sequelize.query(query, { replacements });
    return result[0];
};

export const deleteProduct = async (product_id) => {
    const query = `UPDATE ${TABLE_NAME} SET "deletedAt" = NOW()
                    WHERE product_id = :product_id
    `;
    const replacements = {
        product_id
    }
    const [result] = await sequelize.query(query, { replacements });
    return result[0];
}

export const ifExistingProduct = async (product_id) => {
    const query = `SELECT * FROM ${TABLE_NAME} WHERE product_id = :product_id AND "deletedAt" IS NULL`;
    const [result] = await sequelize.query(query, {
        replacements: { product_id }
    });
    return result[0];
}