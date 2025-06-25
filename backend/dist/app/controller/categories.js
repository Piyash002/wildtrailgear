"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../service/category.service");
const createCategory = async (req, res, next) => {
    const data = req.body;
    const file = req.file;
    const result = await category_service_1.CategoryService.createCategory(data, file);
    res.status(201).json({
        status: true,
        success: true,
        statusCode: 201,
        message: "Category created successfully",
        data: result
    });
};
const getAllCategories = async (req, res, next) => {
    // Assuming CategoryService is defined and has a getAllCategories method
    const result = await category_service_1.CategoryService.getAllCategories();
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Categories retrieved successfully",
        data: result
    });
};
const getCategoryById = async (req, res, next) => {
    const { id } = req.params;
    // Assuming CategoryService is defined and has a getCategoryById method
    const result = await category_service_1.CategoryService.getCategoryById(id);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Category retrieved successfully",
        data: result
    });
};
const updateCategory = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const file = req.file;
    const result = await category_service_1.CategoryService.updateCategory(id, data, file);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Category updated successfully",
        data: result
    });
};
const deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    const result = await category_service_1.CategoryService.deleteCategory(id);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Category deleted successfully",
        data: result
    });
};
exports.CategoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
