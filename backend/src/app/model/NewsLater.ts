// models/Subscriber.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  createdAt: Date;
}

const SubscriberSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Subscriber = mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

export default Subscriber;
