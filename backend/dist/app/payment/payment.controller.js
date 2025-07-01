"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const catchasync_1 = __importDefault(require("../ustils/catchasync"));
const payment_service_1 = require("./payment.service");
const CodPayment = (0, catchasync_1.default)(async (req, res) => {
    const data = req.body;
    const result = await payment_service_1.paymentService.CodPaymet(data);
    res.status(200).json({
        success: true,
        status: true,
        statusCode: 200,
        data: result
    });
});
const GetStatus = (0, catchasync_1.default)(async (req, res) => {
    const result = await payment_service_1.paymentService.GetStatus();
    res.status(200).json({
        success: true,
        status: true,
        statusCode: 200,
        data: result
    });
});
exports.paymentController = {
    CodPayment,
    GetStatus
};
