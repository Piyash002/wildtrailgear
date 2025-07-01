"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsLater = void 0;
const express_1 = __importDefault(require("express"));
const NewsLater_1 = require("../controller/NewsLater");
const router = express_1.default.Router();
router.post('/subscribe', NewsLater_1.newsLaterController.subscribe);
exports.newsLater = router;
