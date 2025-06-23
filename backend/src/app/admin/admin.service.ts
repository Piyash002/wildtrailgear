import AppError from "../errors/AppError";
import { User } from "../model/user"

const getAllUser = async()=>{
const result = await User.find();
return result;
}
const updateUser = async (id:string, data:Record<string, unknown>)=>{
 const  existUser = await User.findById(id);
const {role} = data;
 if(!existUser){
    throw new AppError(404, "user not found")
 };
 const result = await User.findByIdAndUpdate(id, { role }, { new: true });
 return result;
}
const deleteUser = async (id:string)=>{
 const  existUser = await User.findById(id);
 if(!existUser){
    throw new AppError(404, "user not found")
 };
 const result = await User.findByIdAndDelete(id);
 return result;
}
export const AdminService ={
    getAllUser,
    updateUser,
    deleteUser,
}