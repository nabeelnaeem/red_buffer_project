import * as productService from './services/product_service.js';

//Messages
const PRODUCT_CREATED_MESSAGE = 'Product created';
const PRODUCT_NOT_FOUND_MESSAGE = 'Product not found';
const PRODUCT_UPDATED_MESSAGE = 'Product updated';
const PRODUCT_DELETED_MESSAGE = 'Product deleted';
const PRODUCT_NOT_UPDATED_MESSAGE = 'No product found or updated';
const CATEGORY_REQUIRED_MESSAGE = 'Category is required';
const NAME_REQUIRED_MESSAGE = 'Name is required';
const IMAGE_URL_REQUIRED_MESSAGE = 'Image URL is required';


export const createProduct = async (req, res) => {

    try {
        const { category_id, name, description, stock, price, image_url } = req.body;

        if (!category_id) res.status(400).json({ message: CATEGORY_REQUIRED_MESSAGE });
        if (!name) res.status(400).json({ message: NAME_REQUIRED_MESSAGE });
        if (!image_url) res.status(400).json({ message: IMAGE_URL_REQUIRED_MESSAGE });

        await productService.createProduct(category_id, name, description, stock, price, image_url)
            .then((product) => {
                return res.status(201).json({ message: PRODUCT_CREATED_MESSAGE, product });
            })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const name = req.query.name;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder;
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        const products = await productService.getAllProducts({ name, sortBy, sortOrder, page, limit });
        if (products)
            return res.json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const isProductExisting = await productService.ifExistingProduct(id);
        if (!isProductExisting) return res.status(404).json({ error: PRODUCT_NOT_FOUND_MESSAGE });

        const product = await productService.getProductById(id);
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const isProductExisting = await productService.ifExistingProduct(id);
        if (!isProductExisting) return res.status(404).json({ error: PRODUCT_NOT_FOUND_MESSAGE });

        const { category_id, name, description, stock, price, image_url } = req.body;
        if (!category_id) res.status(400).json({ message: CATEGORY_REQUIRED_MESSAGE });
        if (!name) res.status(400).json({ message: NAME_REQUIRED_MESSAGE });


        const updatedProduct = await productService.updateProduct(id, category_id, name, description, stock, price, image_url);
        if (!updatedProduct) {
            return res.status(404).json({ message: PRODUCT_NOT_UPDATED_MESSAGE });
        }
        return res.json(PRODUCT_UPDATED_MESSAGE, updatedProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const isProductExisting = await productService.ifExistingProduct(id);
        if (!isProductExisting) return res.status(404).json({ error: PRODUCT_NOT_FOUND_MESSAGE });

        await productService.deleteProduct(id)
            .then((deletedProduct) => {
                return res.json({ message: PRODUCT_DELETED_MESSAGE });
            })
            .catch(err => {
                return res.status(400).json({ error: err.message });
            })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};