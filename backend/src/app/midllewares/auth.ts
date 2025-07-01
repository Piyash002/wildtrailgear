import { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import { User } from "../model/user";
import { verifyToken } from "./authUtil/authUtils";
import catchAsync from "../ustils/catchasync";
import { Request } from "express";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req, res, next) => {
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
      throw new AppError(401, "Unauthorized: Invalid token");
    }

    // Adjust these keys based on your JWT payload structure
    const role = (verifiedToken as any).role;
    const id = (verifiedToken as any).id;

    if (!role || !id) {
      throw new AppError(401, 'Invalid token payload');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new AppError(401, 'User not found');
    }
    req.user = user;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(403, 'Forbidden: Insufficient permissions');
    }

    next();
  });
};
