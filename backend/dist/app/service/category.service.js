"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const categoy_1 = require("../model/categoy");
const cloudinary_1 = require("../ustils/cloudinary");
const createCategory = async (data, file) => {
    const { categoryName } = data;
    const uppercase = categoryName.toLocaleUpperCase();
    let imageUrls;
    if (file !== undefined) {
        const uploads = await (0, cloudinary_1.uploadToCloudinary)(file);
        imageUrls = Array.isArray(uploads) ? uploads[0]?.secure_url : uploads.secure_url;
    }
    const category = new categoy_1.Category({
        categoryName: uppercase,
        image: imageUrls || ""
    });
    const result = await category.save();
    return result;
};
const getAllCategories = async () => {
    const categories = await categoy_1.Category.find();
    return categories;
};
const getCategoryById = async (id) => {
    const category = await categoy_1.Category.findById(id);
    return category;
};
const updateCategory = async (id, data, file) => {
    const updateData = {};
    if (file) {
        const uploads = await (0, cloudinary_1.uploadToCloudinary)(file);
        updateData.image = Array.isArray(uploads)
            ? uploads[0]?.secure_url
            : uploads.secure_url;
    }
    if (data.categoryName) {
        updateData.categoryName = data.categoryName.toUpperCase();
    }
    const updatedCategory = await categoy_1.Category.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    return updatedCategory;
};
const deleteCategory = async (id) => {
    const deletedCategory = await categoy_1.Category.findByIdAndDelete(id);
    return deletedCategory;
};
exports.CategoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
