import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: {
    id: Types.ObjectId;
    role: string;
  },
  secret: Secret,
  expiresIn: string | number
): string => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as SignOptions['expiresIn'], // 👈 fix here
  });
};



export const verifyToken = (token: string, secret: jwt.Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
