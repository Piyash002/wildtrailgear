"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get('/get_all_user', admin_controller_1.AdminController.getAllUser);
router.patch('/update_user_role/:id', admin_controller_1.AdminController.updateUser);
router.delete('/delete_user/:id', admin_controller_1.AdminController.deleteUser);
exports.adminRoute = router;
