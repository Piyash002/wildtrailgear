"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../model/user");
const dotenv_1 = __importDefault(require("dotenv"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const authUtils_1 = require("../midllewares/authUtil/authUtils");
const random_avatar_generator_1 = require("random-avatar-generator");
dotenv_1.default.config();
const registerUSer = async (data) => {
    const generator = new random_avatar_generator_1.AvatarGenerator();
    // Simply get a random avatar
    const avatarUrl = generator.generateRandomAvatar();
    const { name, email, password } = data;
    console.log(data);
    const existUser = await user_1.User.findOne({ email });
    if (existUser) {
        throw new Error("User Already Register");
    }
    const newUser = new user_1.User({
        name,
        email,
        password,
        role: "USER",
        profileImage: avatarUrl
    });
    await newUser.save();
    return newUser;
};
const loginUser = async (data) => {
    const { email, password } = data;
    const existUser = await user_1.User.findOne({ email });
    if (!existUser) {
        throw new Error("User not found");
    }
    ;
    if (password !== existUser.password) {
        throw new Error('Wrong password');
    }
    const jwtPayload = {
        id: existUser._id,
        role: existUser.role
    };
    if (!process.env.ACCESS_SECRET) {
        console.log("secret", process.env.ACCESS_SECRET);
        throw new Error("ACCESS_SECRET environment variable is not defined");
    }
    const accessToken = (0, authUtils_1.createToken)(jwtPayload, process.env.ACCESS_SECRET, process.env.ACCESS_TOKEN_EXPIRE);
    const refreshToken = (0, authUtils_1.createToken)(jwtPayload, process.env.REFRESH_SECRET, process.env.REFRESH_TOKEN_EXPIRE);
    await existUser.save();
    const result = {
        accessToken,
        refreshToken
    };
    return result;
};
const refreshToken = async (newRefreshToken) => {
    const decode = (0, authUtils_1.verifyToken)(newRefreshToken, process.env.REFRESH_SECRET);
    const { id } = decode;
    console.log(id);
    const existUser = await user_1.User.findById(id);
    console.log(existUser);
    if (!existUser) {
        throw new AppError_1.default(404, "user not found");
    }
    ;
    const jwtPayload = {
        id: existUser._id,
        role: existUser.role
    };
    if (!process.env.ACCESS_SECRET) {
        console.log("secret", process.env.ACCESS_SECRET);
        throw new Error("ACCESS_SECRET environment variable is not defined");
    }
    const accessToken = (0, authUtils_1.createToken)(jwtPayload, process.env.ACCESS_SECRET, process.env.ACCESS_TOKEN_EXPIRE);
    return {
        accessToken
    };
};
exports.UserService = {
    registerUSer,
    loginUser,
    refreshToken,
};
