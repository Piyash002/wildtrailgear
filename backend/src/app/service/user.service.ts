import { Tuser, User } from "../model/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import  dotenv  from 'dotenv';
import AppError from "../errors/AppError";
import { createToken, verifyToken } from "../midllewares/authUtil/authUtils";
import { AvatarGenerator } from "random-avatar-generator";
dotenv.config()
const registerUSer = async(data: Tuser)=>{
const generator = new AvatarGenerator();
// Simply get a random avatar
const avatarUrl = generator.generateRandomAvatar();
const {name,email,password} = data
console.log(data)
const existUser = await User.findOne({email});
if(existUser){
    throw new Error("User Already Register");
}
const newUser = new User({
    name,
    email,
    password,
    role:"USER",
    profileImage:avatarUrl
})
await newUser.save();
  return newUser
}
const loginUser = async(data:  Tuser)=>{
    const {email, password}=data;
    const existUser = await User.findOne({email});
    if(!existUser){
        throw new Error("User not found")
    };
    if(password!==existUser.password){
        throw new Error('Wrong password')
    }
    const jwtPayload = {
        id: existUser._id,
        role: existUser.role
    }
    if (!process.env.ACCESS_SECRET) {
        console.log("secret",process.env.ACCESS_SECRET)
        throw new Error("ACCESS_SECRET environment variable is not defined");
    }
   const accessToken = createToken(jwtPayload, process.env.ACCESS_SECRET, process.env.ACCESS_TOKEN_EXPIRE!)
   const refreshToken =  createToken(jwtPayload, process.env.REFRESH_SECRET!, process.env.REFRESH_TOKEN_EXPIRE!)
 await existUser.save()
const result  = {
 accessToken,
 refreshToken
}
return result
}
const refreshToken = async (newRefreshToken: any)=>{
 const decode = verifyToken(newRefreshToken, process.env.REFRESH_SECRET!) as  JwtPayload
 const {id} = decode
 console.log(id)
 const  existUser = await User.findById(id);
 console.log(existUser)
 if(!existUser){
    throw new AppError(404, "user not found")
 };
    const jwtPayload = {
        id: existUser._id,
        role: existUser.role
    }
    if (!process.env.ACCESS_SECRET) {
        console.log("secret",process.env.ACCESS_SECRET)
        throw new Error("ACCESS_SECRET environment variable is not defined");
    }
   const accessToken = createToken(jwtPayload, process.env.ACCESS_SECRET, process.env.ACCESS_TOKEN_EXPIRE!)
return {
    accessToken
}
}

export const UserService = {
    registerUSer,
    loginUser,
    refreshToken,
    
}