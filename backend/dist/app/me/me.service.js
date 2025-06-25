"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meService = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_1 = require("../model/user");
const getSinglUser = async (id) => {
    const existUser = await user_1.User.findById(id);
    if (!existUser) {
        throw new AppError_1.default(404, "User not found");
    }
    ;
    return existUser;
};
exports.meService = {
    getSinglUser
};
