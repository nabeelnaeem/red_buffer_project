import * as productService from './services/product_service.js';

//Messages
const PRODUCT_CREATED_MESSAGE = 'Product created';
const PRODUCT_UPDATED_MESSAGE = 'Product updated';
const PRODUCT_DELETED_MESSAGE = 'Product dreated';


export const createProduct = async (req, res) => {

    try {

        //Create Product Logic
        res.status(201).json({ message: PRODUCT_CREATED_MESSAGE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        if (products)
            res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        //Fetch product by id;
        res.json({});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        res.json({ message: PRODUCT_UPDATED_MESSAGE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        res.json({ message: PRODUCT_DELETED_MESSAGE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};