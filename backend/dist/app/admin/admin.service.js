"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_1 = require("../model/user");
const getAllUser = async () => {
    const result = await user_1.User.find();
    return result;
};
const updateUser = async (id, data) => {
    const existUser = await user_1.User.findById(id);
    const { role } = data;
    if (!existUser) {
        throw new AppError_1.default(404, "user not found");
    }
    ;
    const result = await user_1.User.findByIdAndUpdate(id, { role }, { new: true });
    return result;
};
const deleteUser = async (id) => {
    const existUser = await user_1.User.findById(id);
    if (!existUser) {
        throw new AppError_1.default(404, "user not found");
    }
    ;
    const result = await user_1.User.findByIdAndDelete(id);
    return result;
};
exports.AdminService = {
    getAllUser,
    updateUser,
    deleteUser,
};
