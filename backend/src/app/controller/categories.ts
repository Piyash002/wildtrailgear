import { RequestHandler } from "express";
import { CategoryService } from "../service/category.service";

const createCategory: RequestHandler = async(req, res, next)=>{
    const data = req.body;
    const file = req.file as unknown as Express.Multer.File
    const result = await CategoryService.createCategory(data, file);
    res.status(201).json({
        status: true,
        success: true,
        statusCode: 201,
        message: "Category created successfully",
        data: result
    });
} 
const getAllCategories: RequestHandler = async(req, res, next)=>{
    // Assuming CategoryService is defined and has a getAllCategories method
    const result = await CategoryService.getAllCategories();
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Categories retrieved successfully",
        data: result
    });
}
const getCategoryById: RequestHandler = async(req, res, next)=>{
    const { id } = req.params;
    // Assuming CategoryService is defined and has a getCategoryById method
    const result = await CategoryService.getCategoryById(id);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Category retrieved successfully",
        data: result
    });
}
const updateCategory: RequestHandler = async(req, res, next)=>{
    const { id } = req.params;
    const data = req.body;
    const file = req.file as unknown as Express.Multer.File;
    const result = await CategoryService.updateCategory(id, data,file);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Category updated successfully",
        data: result
    });
}
const deleteCategory: RequestHandler = async(req, res, next)=>{
    const { id } = req.params;
    const result = await CategoryService.deleteCategory(id);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Category deleted successfully",
        data: result
    });
}
export const CategoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
