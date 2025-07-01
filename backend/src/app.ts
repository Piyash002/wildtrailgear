import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// Removed duplicate imports
import { UserRoutes } from './app/routes/user.routes';
import globalErrorHandler from './app/midllewares/globalErrorHandler';
import { productRoutes } from './app/routes/product.route';
import { categoryRoutes } from './app/routes/category.route';
import { meRoute } from './app/me/me.route';
import { adminRoute } from './app/admin/admin.route';
import { StripePaymentrouter } from './app/payment/StripePayment';
import { payment } from './app/payment/payment.route';
import { reviewRoute } from './app/routes/review';
import { offerRoutes } from './app/routes/Offer.route';
import { newsLater } from './app/routes/newslater.route';
export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://wildtrailgear.vercel.app", 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
//routes
app.use('/api/auth', UserRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/me', meRoute)
app.use('/api/admin', adminRoute)
app.use('/api/stripe', StripePaymentrouter)
app.use('/api/order',payment)
app.use('/api/review',reviewRoute)
app.use('/api/offers', offerRoutes);
app.use('/api/newsletter',newsLater);

//global error handler
app.use(globalErrorHandler);
// Mount routes here
app.get('/', (req, res) => {
  res.send('Hello World');
});
