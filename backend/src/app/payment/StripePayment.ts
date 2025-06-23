import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import AppError from '../errors/AppError';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY not defined in environment!");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
});

const router = express.Router();

interface CartItem {
  productName: string;
  image: string;
  price: number;
  quantity: number;
}

router.post('/create-checkout-session', async (req, res) => {
  const cartItems: CartItem[] = req.body.cartItems;

  console.log("➡️ Received cartItems:", cartItems);

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    throw new AppError(400, "No valid cart items provided.");
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
      success_url: `http://localhost:5173/payment-success`,
      cancel_url: `http://localhost:5173/payment-cancel`,
      payment_intent_data: {
        statement_descriptor: "WildTrail Gear Purchase",
      },
    });

    console.log("✅ Stripe session URL:", session.url);
    res.json({ url: session.url });
  } catch (err: any) {
    console.error("❌ Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export const StripePaymentrouter = router;
