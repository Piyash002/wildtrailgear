"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFromCloudinary = exports.upload = exports.uploadToCloudinary = void 0;
// src/utils/cloudinaryUploader.ts
const cloudinary_1 = require("cloudinary");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_build_url_1 = require("cloudinary-build-url");
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// 🔵 Main uploader function (unified for single/multiple)
const uploadToCloudinary = async (files) => {
    const filesArray = Array.isArray(files) ? files : [files];
    const uploadPromises = filesArray.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({
                folder: "products",
                public_id: (0, uuid_1.v4)(),
                resource_type: "image",
            }, (error, result) => {
                if (error || !result)
                    return reject(error);
                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            }).end(file.buffer);
        });
    });
    return await Promise.all(uploadPromises);
};
exports.uploadToCloudinary = uploadToCloudinary;
exports.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// ✅ Delete from Cloudinary
const deleteImageFromCloudinary = async (cloudinaryUrl) => {
    try {
        const publicId = (0, cloudinary_build_url_1.extractPublicId)(cloudinaryUrl);
        await cloudinary_1.v2.uploader.destroy(publicId);
        console.log("Image deleted from Cloudinary:", publicId);
    }
    catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
    }
};
exports.deleteImageFromCloudinary = deleteImageFromCloudinary;
