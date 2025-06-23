import express from 'express'
import { CategoryController } from '../controller/categories';
import { upload } from '../ustils/cloudinary';
import { auth } from '../midllewares/auth';
import { USER_Role } from '../types/Tuser';
const  router = express.Router()
router.post("/create-category",auth("ADMIN"),upload.single("image"), CategoryController.createCategory)
router.get("/", CategoryController.getAllCategories)

router.get("/get-category/:id", CategoryController.getCategoryById)
router.patch("/update-category/:id",upload.single("image"), CategoryController.updateCategory)
router.delete("/delete-category/:id", CategoryController.deleteCategory)

export const  categoryRoutes = router;