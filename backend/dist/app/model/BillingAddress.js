"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingAddress = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const BillingAddressSchema = new mongoose_1.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    zila: { type: String, trim: true, required: true },
    upozila: { type: String, trim: true, required: true },
    postcode: { type: String, trim: true, },
    cartItems: [
        {
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "Product" },
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
exports.BillingAddress = mongoose_1.default.models.BillingAddress ||
    mongoose_1.default.model("BillingAddress", BillingAddressSchema);
