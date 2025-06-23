import catchAsync from "../ustils/catchasync";
import { meService } from "./me.service";

const getSinglUser = catchAsync(async(req, res, next)=>{
const id = req.params.id;
const result = await meService.getSinglUser(id);
 res.status(201).json({
        status:true,
        success:true,
        statusCode:201,
        message:"User retrive successfully",
        data : result
    })
})


export const  meController = {
getSinglUser,
}