"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const catchasync_1 = __importDefault(require("../ustils/catchasync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_1 = require("../model/user");
const dotenv_1 = __importDefault(require("dotenv"));
const authUtils_1 = require("./authUtil/authUtils");
const USER_Role = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};
dotenv_1.default.config();
const auth = (...requiredRoles) => {
    return (0, catchasync_1.default)(async (req, res, next) => {
        let accessToken;
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith("Bearer ")) {
            accessToken = authHeader.split(" ")[1];
        }
        else if (req.cookies.accessToken) {
            accessToken = req.cookies.accessToken;
        }
        if (!accessToken) {
            throw new AppError_1.default(401, "Unauthorized: No access token provided");
        }
        let verifiedToken;
        try {
            verifiedToken = (0, authUtils_1.verifyToken)(accessToken, process.env.ACCESS_SECRET);
        }
        catch (error) {
            throw new AppError_1.default(401, "Unauthorized");
        }
        const { role, id } = verifiedToken;
        const user = await user_1.User.findById(id);
        if (!user) {
            throw new AppError_1.default(401, 'User not found');
        }
        if (!requiredRoles.includes(role)) {
            throw new AppError_1.default(401, 'You are not authorized to access this route');
        }
        next();
    });
};
exports.auth = auth;
