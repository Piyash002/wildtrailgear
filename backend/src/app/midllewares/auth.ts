import { NextFunction, Request, Response } from "express";
import catchAsync from "../ustils/catchasync";
import AppError from "../errors/AppError";
import { JwtPayload } from 'jsonwebtoken';

import { User } from "../model/user";
import dotenv from 'dotenv';
import { verifyToken } from "./authUtil/authUtils";
const USER_Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

type TUserRole = keyof typeof  USER_Role;
dotenv.config()

export const auth = (...requiredRoles :TUserRole[]  )=>{
 return catchAsync(async(req:Request, res:Response,next:NextFunction)=>{
let accessToken: string | undefined;

const authHeader = req.headers.authorization;
if (authHeader?.startsWith("Bearer ")) {
  accessToken = authHeader.split(" ")[1];
} else if (req.cookies.accessToken) {
  accessToken = req.cookies.accessToken;
}

if (!accessToken) {
  throw new AppError(401, "Unauthorized: No access token provided");
}
let verifiedToken;
try {
  verifiedToken = verifyToken(accessToken, process.env.ACCESS_SECRET as string) as JwtPayload;
} catch (error) {
  throw new AppError(401, "Unauthorized");
}

    const { role, id} = verifiedToken as JwtPayload;
    const user = await User.findById(id)
    if (!user) {
      throw new AppError(401, 'User not found');
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized to access this route');
    }

    next();
    

 })
}