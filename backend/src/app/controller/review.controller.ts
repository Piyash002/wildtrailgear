import { reviewService } from "../service/review.service";
import catchAsync from "../ustils/catchasync";

const addReview = catchAsync(async(req,res)=>{
    const  data = req.body;
    const  {id} = req.params
    const userID = req.user._id
    const result = await reviewService.addReview(data, id,userID)
      res.status(201).json({
        status: true,
        success: true,
        statusCode: 201,
        message: "Thanks for your review",
        data: result
    });
})


export const reviewController = {
    addReview
}