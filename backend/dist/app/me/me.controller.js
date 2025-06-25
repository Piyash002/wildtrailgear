"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meController = void 0;
const catchasync_1 = __importDefault(require("../ustils/catchasync"));
const me_service_1 = require("./me.service");
const getSinglUser = (0, catchasync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const result = await me_service_1.meService.getSinglUser(id);
    res.status(201).json({
        status: true,
        success: true,
        statusCode: 201,
        message: "User retrive successfully",
        data: result
    });
});
exports.meController = {
    getSinglUser,
};
