"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meRoute = void 0;
const express_1 = __importDefault(require("express"));
const me_controller_1 = require("./me.controller");
const router = express_1.default.Router();
router.get("/:id", me_controller_1.meController.getSinglUser);
exports.meRoute = router;
