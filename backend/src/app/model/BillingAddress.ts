import mongoose, { Schema } from "mongoose";

export interface TBillingAddress {
  name: string;
  email: string;
  address: string;
  zila: string;
  upozila: string;
  postcode: string;
  phone: string;
  status: string;
  cartItems: {
    productId: mongoose.Types.ObjectId;
    productName: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: string;
  isPaid: boolean;
  paymentIntentId: string;
}

const BillingAddressSchema: Schema<TBillingAddress> = new Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  phone: { type: String, trim: true, required: true },
  address: { type: String, trim: true, required: true },
  zila: { type: String, trim: true, required: true },
  upozila: { type: String, trim: true, required: true },
  postcode: { type: String, trim: true, },
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  paymentMethod: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled", "delivered"],
    default: "pending",
  },
  isPaid: { type: Boolean, default: false },
  paymentIntentId: { type: String, default: "" },
});

export const BillingAddress =
  mongoose.models.BillingAddress ||
  mongoose.model<TBillingAddress>("BillingAddress", BillingAddressSchema);
