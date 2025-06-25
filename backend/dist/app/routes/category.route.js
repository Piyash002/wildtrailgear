"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const categories_1 = require("../controller/categories");
const cloudinary_1 = require("../ustils/cloudinary");
const auth_1 = require("../midllewares/auth");
const router = express_1.default.Router();
router.post("/create-category", (0, auth_1.auth)("ADMIN"), cloudinary_1.upload.single("image"), categories_1.CategoryController.createCategory);
router.get("/", categories_1.CategoryController.getAllCategories);
router.get("/get-category/:id", categories_1.CategoryController.getCategoryById);
router.patch("/update-category/:id", cloudinary_1.upload.single("image"), categories_1.CategoryController.updateCategory);
router.delete("/delete-category/:id", categories_1.CategoryController.deleteCategory);
exports.categoryRoutes = router;
