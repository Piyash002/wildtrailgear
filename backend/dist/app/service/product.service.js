"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const products_1 = require("../model/products");
const createProduct = async (data, mainIndex) => {
    const { productName, price, description, category, images, stockQuantity } = data;
    const priceIntoNumber = Number(price);
    const stockQuantityIntoNumber = Number(stockQuantity);
    if (!Array.isArray(images)) {
        throw new AppError_1.default(404, "image must be arra");
    }
    const product = new products_1.Product({
        productName,
        price: priceIntoNumber,
        description,
        stockQuantity: stockQuantityIntoNumber,
        category,
        images
    });
    const result = await product.save();
    return result;
};
const getAllProducts = async () => {
    const result = await products_1.Product.find();
    return result;
};
const getProductById = async (id) => {
    const existProduct = await products_1.Product.findById(id);
    if (!existProduct) {
        throw new AppError_1.default(404, 'Product not found');
    }
    const result = await products_1.Product.findById(id);
    return result;
};
const getProductByCategory = async (searhTerm) => {
    const categoryName = searhTerm.category;
    let query = {};
    if (categoryName) {
        query = { category: categoryName };
    }
    const existProduct = await products_1.Product.find(query);
    if (!existProduct) {
        throw new AppError_1.default(404, 'Product not found');
    }
    const result = await products_1.Product.find(query);
    return result;
};
const updateProduct = async (id, data) => {
    const existProduct = await products_1.Product.findById(id);
    if (!existProduct) {
        throw new AppError_1.default(404, "product not found");
    }
    ;
    const Updatedata = {
        productName: data.productName,
        price: data.price,
        description: data.description,
        stockQuantity: data.stockQuantity,
        category: data.category,
        images: data.images
    };
    const updateProduct = await products_1.Product.findOneAndUpdate({ _id: id }, {
        $set: Updatedata
    }, { new: true });
    return updateProduct;
};
const deleteProduct = async (id) => {
    const existProduct = await products_1.Product.findById(id);
    if (!existProduct) {
        throw new AppError_1.default(404, "product not found");
    }
    ;
    const result = await products_1.Product.findByIdAndDelete(id);
    return result;
};
exports.ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByCategory,
    updateProduct,
    deleteProduct
};
