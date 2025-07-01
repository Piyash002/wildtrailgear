"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripePaymentrouter = void 0;
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const AppError_1 = __importDefault(require("../errors/AppError"));
dotenv_1.default.config();
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("❌ STRIPE_SECRET_KEY not defined in environment!");
}
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-05-28.basil',
});
const router = express_1.default.Router();
router.post('/create-checkout-session', async (req, res) => {
    const { cartItems, shippingData } = req.body;
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        throw new AppError_1.default(400, "No valid cart items provided.");
    }
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: 'bdt',
                    product_data: {
                        name: item.productName,
                        images: [item.image],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            success_url: `https://wildtrailgear.vercel.app/payment-success`,
            cancel_url: `https://wildtrailgear.vercel.app/payment-cancel`,
            payment_intent_data: {
                statement_descriptor: "WildTrail Gear",
            },
        });
        console.log("SESSION=>", session);
        res.json({ url: session.url });
    }
    catch (err) {
        console.error("❌ Stripe Error:", err);
        res.status(500).json({ error: err.message });
    }
});
exports.StripePaymentrouter = router;
