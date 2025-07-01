"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_1 = require("../model/user");
const authUtils_1 = require("./authUtil/authUtils");
const catchasync_1 = __importDefault(require("../ustils/catchasync"));
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
            throw new AppError_1.default(401, "Unauthorized: Invalid token");
        }
        // Adjust these keys based on your JWT payload structure
        const role = verifiedToken.role;
        const id = verifiedToken.id;
        if (!role || !id) {
            throw new AppError_1.default(401, 'Invalid token payload');
        }
        const user = await user_1.User.findById(id);
        if (!user) {
            throw new AppError_1.default(401, 'User not found');
        }
        req.user = user;
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new AppError_1.default(403, 'Forbidden: Insufficient permissions');
        }
        next();
    });
};
exports.auth = auth;
