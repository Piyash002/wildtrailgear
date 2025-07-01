import mongoose, { Schema, Document } from 'mongoose';

export interface TOffer extends Document {
  title: string;
  description?: string;
  image?: string;
  discountText?: string;
  validFrom?: Date;
  validUntil?: Date;
  isActive: boolean;
  product: mongoose.Types.ObjectId;
}

const offerSchema = new Schema<TOffer>(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    discountText: { type: String },
    validFrom: { type: Date },
    validUntil: { type: Date },
    isActive: { type: Boolean, default: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
  },
  { timestamps: true }
);

export const Offer = mongoose.models.Offer || mongoose.model<TOffer>('Offer', offerSchema);
