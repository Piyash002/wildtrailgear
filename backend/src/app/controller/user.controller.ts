import { RequestHandler } from "express";
import { UserService } from './../service/user.service';
import catchAsync from "../ustils/catchasync";

const registerUSer:RequestHandler = async(req,res,next)=>{
    const data = req.body;
    console.log(data)
   try {
     const result = await UserService.registerUSer(data);
    res.status(201).json({
        status:true,
        success:true,
        statusCode:201,
        message:"User registered successfully",
        data : result
    })
   } catch (error) {
    next(error)
   }
};
const loginUser:RequestHandler = async(req,res,next)=>{
    const data = req.body;
   try {
     const {accessToken, refreshToken} = await UserService.loginUser(data);
   res.cookie("accessToken",accessToken,{
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }).cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:'strict',
    }).status(200).json({
        success:true,
        statusCode:200,
        message:"User logged In successFully",
        data: accessToken,
    })
   } catch (error) {
    next(error)
   }
};
const refreshToken = catchAsync(async(req,res)=>{
     const  { refreshToken} = req.cookies;
     console.log(refreshToken)
     const result = await UserService.refreshToken(refreshToken);
     res.status(200).json({
        success:true,
        statusCode:200,
        message:"access token retrive successfully",
        data:{accessToken: result.accessToken,} // 
    })
})
export const UserController = {
    registerUSer,
    loginUser,
    refreshToken,
  
}