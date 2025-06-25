import catchAsync from "../ustils/catchasync";
import {  paymentService } from "./payment.service";

const CodPayment = catchAsync(async(req,res)=>{
    const data = req.body
    const result = await paymentService.CodPaymet(data)
     res.status(200).json({
        success:true,
        status:true,
        statusCode:200,
        data:result
    })
})
const GetStatus = catchAsync(async(req,res)=>{

    const result = await paymentService.GetStatus()
     res.status(200).json({
        success:true,
        status:true,
        statusCode:200,
        data:result
    })
})

export const paymentController = {
CodPayment,
GetStatus
}