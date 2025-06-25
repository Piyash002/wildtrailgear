"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const catchasync_1 = __importDefault(require("../ustils/catchasync"));
const admin_service_1 = require("./admin.service");
const getAllUser = (0, catchasync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminService.getAllUser();
    res.status(201).json({
        status: true,
        success: true,
        statusCode: 201,
        message: "User get successfully",
        data: result
    });
});
const updateUser = (0, catchasync_1.default)(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const data = req.body;
    const result = await admin_service_1.AdminService.updateUser(id, data);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "user update successfully",
        data: result // 
    });
});
const deleteUser = (0, catchasync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await admin_service_1.AdminService.deleteUser(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "user delete successfully",
        data: result // 
    });
});
exports.AdminController = {
    getAllUser,
    updateUser,
    deleteUser
};
