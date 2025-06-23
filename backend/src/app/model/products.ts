import mongoose, { Schema, Document } from "mongoose";

// Define the TImage interface
interface TImage {
  url: string;
  isMain?: boolean;
}

export interface Tproduct extends Document {
  productName: string;
  price: number;
  stockQuantity: number;
  description: string;
  category: string;
  ratings: number;
  images: TImage[];
}

const imageSchema = new Schema<TImage>(
  {
    url: { type: String, required: true },
    isMain: { type: Boolean, default: false },
  },
  { _id: false }
);

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
    ratings: {
      type: Number,
      default: 0,
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
