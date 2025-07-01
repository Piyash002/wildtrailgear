import AppError from "../errors/AppError";
import { Product } from "../model/products";
import mongoose from "mongoose";

const addReview = async(data:any, prodcuctId:string, userId:string)=>{
     const{rating, comment} = data;
     const product = await Product.findById(prodcuctId);
     if(!product){
        throw new AppError(501, "product Not available")
     }
   const review = {
    user: new mongoose.Types.ObjectId(userId),
    rating,
    comment,
    createdAt: new Date(),
  };
  product.reviews.push(review);
const total = product.reviews.reduce((acc, r) => acc + r.rating, 0);
const averageReview = Math.round(total / product.reviews.length);
product.avarageratings = averageReview;

  await product.save();
}

export const reviewService = {
    addReview
}