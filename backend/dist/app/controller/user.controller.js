"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./../service/user.service");
const catchasync_1 = __importDefault(require("../ustils/catchasync"));
const registerUSer = async (req, res, next) => {
    const data = req.body;
    console.log(data);
    try {
        const result = await user_service_1.UserService.registerUSer(data);
        res.status(201).json({
            status: true,
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
const loginUser = async (req, res, next) => {
    const data = req.body;
    try {
        const { accessToken, refreshToken } = await user_service_1.UserService.loginUser(data);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }).cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        }).status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged In successFully",
            data: accessToken,
        });
    }
    catch (error) {
        next(error);
    }
};
const refreshToken = (0, catchasync_1.default)(async (req, res) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        res.status(401).json({ message: "No refresh token" });
        return;
    }
    const result = await user_service_1.UserService.refreshToken(token);
    res.status(200).json({
        success: true,
        message: "Access token retrieved",
        data: { accessToken: result.accessToken },
    });
});
exports.UserController = {
    registerUSer,
    loginUser,
    refreshToken,
};
