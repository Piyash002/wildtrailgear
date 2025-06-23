import AppError from "../errors/AppError";
import { User } from "../model/user";

const getSinglUser = async(id:string)=>{
 const existUser = await User.findById(id);
 if(!existUser){
    throw new AppError(404, "User not found")
 };
 return existUser;
};

export const meService = {
    getSinglUser
}