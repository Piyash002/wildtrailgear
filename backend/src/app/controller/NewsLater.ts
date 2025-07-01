import { NewsLaterService } from "../service/newsLate.service";
import catchAsync from "../ustils/catchasync";

const subscribe = catchAsync(async(req, res)=>{
    const {email} = req.body;
    console.log(email)
    const result = await NewsLaterService.subscribe(email)
    res.status(201).json({ success: true, messsage:"Thanks for your message", data: result });
})

export const newsLaterController = {
    subscribe
}