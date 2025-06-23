import catchAsync from "../ustils/catchasync";
import { AdminService } from "./admin.service";

const getAllUser = catchAsync(async(req, res)=>{
    const result = await AdminService.getAllUser();
    res.status(201).json({
        status:true,
        success:true,
        statusCode:201,
        message:"User get successfully",
        data : result
   
    })
})
const updateUser = catchAsync(async(req,res)=>{
     const  id = req.params.id;
     console.log(id)
     const data = req.body;
     const result = await AdminService.updateUser(id, data);
     res.status(200).json({
        success:true,
        statusCode:200,
        message:"user update successfully",
        data:result // 
    })
})
const deleteUser = catchAsync(async(req,res)=>{
     const  id = req.params.id;
     const result = await AdminService.deleteUser(id);
     res.status(200).json({
        success:true,
        statusCode:200,
        message:"user delete successfully",
        data:result // 
    })
})

export const AdminController = {
    getAllUser,
    updateUser,
    deleteUser
}