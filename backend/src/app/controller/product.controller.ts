import { RequestHandler } from "express";
import { ProductService } from "../service/product.service";
import { ObjectId } from "mongoose";
import catchAsync from "../ustils/catchasync";

const createProduct:RequestHandler = async(req,res)=>{
    const data = req.body;
    const mainIndex = parseInt(req.body.mainImageIndex);

    const result = await ProductService.createProduct(data, mainIndex);
    res.status(201).json({
        status: true,
        success: true,
        statusCode: 201,
        message: "Product added successfully",
        data: result
    });
}
const getAllProducts:RequestHandler = async(req,res,next)=>{
    const result = await ProductService.getAllProducts();
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Products fetched successfully",
        data: result
    });
}
const getProductById:RequestHandler = catchAsync(async(req,res)=>{
    const {id} = req.params 
    const result = await ProductService.getProductById(id);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product fetched successfully",
        data: result
    });
})
const getProductByCategory:RequestHandler = catchAsync(async(req,res)=>{
    const categoryName = req.query
    const result = await ProductService.getProductByCategory(categoryName);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product fetched successfully",
        data: result
    });
})
const updateProduct:RequestHandler = async(req,res,next)=>{
    const {id} = req.params;
    const data = req.body;
    const result = await ProductService.updateProduct(id, data);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product updated successfully",
        data: result
    });
}
const decreaseProduct:RequestHandler = async(req,res,next)=>{
    const {id} = req.params;
    const{ quantity} = req.body;
    console.log("quantyty",quantity)
    const result = await ProductService.decreaseProduct(id, quantity);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product updated successfully",
        data: result
    });
}
const deleteProduct:RequestHandler = async(req,res,next)=>{
    const {id} = req.params;
    await ProductService.deleteProduct(id);
    res.status(200).json({
        status: true,
        success: true,
        statusCode: 200,
        message: "Product deleted successfully"
    });
}
export const ProductController = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByCategory,
    updateProduct,
    deleteProduct,
    decreaseProduct
};