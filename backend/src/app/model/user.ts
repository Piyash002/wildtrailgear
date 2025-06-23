import mongoose, { Schema } from "mongoose";
import { UserRole } from "../ustils/userconst";
export interface Tuser {
name:string;
email:string;
role: 'USER'| 'ADMIN';
password: string;
phone: string;
profileImage: string;
createdAt: Date;
updatedAt: Date;
}
export interface TuserLogin {
    email:string;
    password: string;
}
 const userShecma:Schema<Tuser> = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
    },
    role:{
        type:String,
        required: true,
        enum: UserRole,
        default:'USER'

    },
    password:{
        type: String,
        required:true,
        trim:true,
    },
    profileImage:{
        type: String,
        trim:true,
    },
    phone:{
        type: String,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }

})
export const User = (mongoose.models.User as mongoose.Model<Tuser> )|| mongoose.model<Tuser>('User', userShecma)