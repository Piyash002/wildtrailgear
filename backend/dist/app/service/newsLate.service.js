"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsLaterService = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const NewsLater_1 = __importDefault(require("../model/NewsLater"));
const subscribe = async (email) => {
    const subscriber = await NewsLater_1.default.findOne({ email });
    if (subscriber) {
        throw new AppError_1.default(501, 'you aleready subcribe');
    }
    const data = NewsLater_1.default.create({ email });
    console.log(data);
    return data;
};
exports.NewsLaterService = {
    subscribe
};
