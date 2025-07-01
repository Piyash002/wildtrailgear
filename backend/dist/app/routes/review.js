"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoute = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controller/review.controller");
const auth_1 = require("../midllewares/auth");
const router = express_1.default.Router();
router.post('/add-review/:id', (0, auth_1.auth)("USER"), review_controller_1.reviewController.addReview);
exports.reviewRoute = router;
