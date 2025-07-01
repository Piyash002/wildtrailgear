"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../service/product.service");
const catchasync_1 = __importDefault(require("../ustils/catchasync"));
const createProduct = async (req, res) => {
    const data = req.body;
    const mainIndex = parseInt(req.body.mainImageIndex);
    const result = await product_service_1.ProductService.createProduct(data, mainIndex);
    res.status(201).json({
        status: true,
        success: true,
        statusCode: 201,
        message: "Product added successfully",
        data: result
    });
};
const getAllProducts = (0, catchasync_1.default)(async (req, res, next) => {
    const query = req.query;
    const result = await product_service_1.ProductService.getAllProducts(query);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Products fetched successfully",
        data: result
    });
});
const soldPQuantity = (0, catchasync_1.default)(async (req, res, next) => {
    const query = req.query;
    const result = await product_service_1.ProductService.soldPQuantity();
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Products fetched successfully",
        data: result
    });
});
const getProductById = (0, catchasync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await product_service_1.ProductService.getProductById(id);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product fetched successfully",
        data: result
    });
});
const getProductByCategory = (0, catchasync_1.default)(async (req, res) => {
    const categoryName = req.query;
    const result = await product_service_1.ProductService.getProductByCategory(categoryName);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product fetched successfully",
        data: result
    });
});
const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const result = await product_service_1.ProductService.updateProduct(id, data);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product updated successfully",
        data: result
    });
};
const decreaseProduct = async (req, res, next) => {
    const { id } = req.params;
    const { quantity } = req.body;
    console.log("quantyty", quantity);
    const result = await product_service_1.ProductService.decreaseProduct(id, quantity);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product updated successfully",
        data: result
    });
};
const totalSell = async (req, res, next) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const result = await product_service_1.ProductService.totalSell(id, quantity);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product updated successfully",
        data: result
    });
};
const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    await product_service_1.ProductService.deleteProduct(id);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product deleted successfully"
    });
};
exports.ProductController = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByCategory,
    updateProduct,
    deleteProduct,
    decreaseProduct,
    totalSell,
    soldPQuantity
};
