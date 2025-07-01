"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Removed duplicate imports
const user_routes_1 = require("./app/routes/user.routes");
const globalErrorHandler_1 = __importDefault(require("./app/midllewares/globalErrorHandler"));
const product_route_1 = require("./app/routes/product.route");
const category_route_1 = require("./app/routes/category.route");
const me_route_1 = require("./app/me/me.route");
const admin_route_1 = require("./app/admin/admin.route");
const StripePayment_1 = require("./app/payment/StripePayment");
const payment_route_1 = require("./app/payment/payment.route");
const review_1 = require("./app/routes/review");
const Offer_route_1 = require("./app/routes/Offer.route");
const newslater_route_1 = require("./app/routes/newslater.route");
exports.app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://wildtrailgear.vercel.app",
];
exports.app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
exports.app.use(express_1.default.json({ limit: '10mb' }));
exports.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
exports.app.use((0, cookie_parser_1.default)());
//routes
exports.app.use('/api/auth', user_routes_1.UserRoutes);
exports.app.use('/api/products', product_route_1.productRoutes);
exports.app.use('/api/categories', category_route_1.categoryRoutes);
exports.app.use('/api/me', me_route_1.meRoute);
exports.app.use('/api/admin', admin_route_1.adminRoute);
exports.app.use('/api/stripe', StripePayment_1.StripePaymentrouter);
exports.app.use('/api/order', payment_route_1.payment);
exports.app.use('/api/review', review_1.reviewRoute);
exports.app.use('/api/offers', Offer_route_1.offerRoutes);
exports.app.use('/api/newsletter', newslater_route_1.newsLater);
//global error handler
exports.app.use(globalErrorHandler_1.default);
// Mount routes here
exports.app.get('/', (req, res) => {
    res.send('Hello World');
});
