import mongoose, { Schema, Document } from "mongoose";

// Define the TImage interface
interface TImage {
  url: string;
  isMain?: boolean;
}

export interface TReview {
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Tproduct extends Document {
  productName: string;
  price: number;
  stockQuantity: number;
  description: string;
  category: string;
  avarageratings: number;
  numberOfRevies: number;
  soldCount: number; 
  reviews: TReview[];
  images: TImage[];
}

const imageSchema = new Schema<TImage>(
  {
    url: { type: String, required: true },
    isMain: { type: Boolean, default: false },
  },
  { _id: false }
);

const reviewsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema: Schema<Tproduct> = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    avarageratings: {
      type: Number,
      default: 0,
    },
    numberOfRevies: {
      type: Number,
      default: 0,
    },
    soldCount: {
      type: Number,
      default: 0, 
    },
    reviews: {
      type: [reviewsSchema],
    },
    images: {
      type: [imageSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product as mongoose.Model<Tproduct> ||
  mongoose.model<Tproduct>("Product", productSchema);
