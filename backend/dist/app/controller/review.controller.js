"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const review_service_1 = require("../service/review.service");
const catchasync_1 = __importDefault(require("../ustils/catchasync"));
const addReview = (0, catchasync_1.default)(async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    const userID = req.user._id;
    const result = await review_service_1.reviewService.addReview(data, id, userID);
    res.status(201).json({
        status: true,
        success: true,
        statusCode: 201,
        message: "Thanks for your review",
        data: result
    });
});
exports.reviewController = {
    addReview
};
