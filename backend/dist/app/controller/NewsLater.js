"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsLaterController = void 0;
const newsLate_service_1 = require("../service/newsLate.service");
const catchasync_1 = __importDefault(require("../ustils/catchasync"));
const subscribe = (0, catchasync_1.default)(async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const result = await newsLate_service_1.NewsLaterService.subscribe(email);
    res.status(201).json({ success: true, messsage: "Thanks for your message", data: result });
});
exports.newsLaterController = {
    subscribe
};
