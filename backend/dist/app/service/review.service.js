"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const products_1 = require("../model/products");
const mongoose_1 = __importDefault(require("mongoose"));
const addReview = async (data, prodcuctId, userId) => {
    const { rating, comment } = data;
    const product = await products_1.Product.findById(prodcuctId);
    if (!product) {
        throw new AppError_1.default(501, "product Not available");
    }
    const review = {
        user: new mongoose_1.default.Types.ObjectId(userId),
        rating,
        comment,
        createdAt: new Date(),
    };
    product.reviews.push(review);
    const total = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageReview = Math.round(total / product.reviews.length);
    product.avarageratings = averageReview;
    await product.save();
};
exports.reviewService = {
    addReview
};
