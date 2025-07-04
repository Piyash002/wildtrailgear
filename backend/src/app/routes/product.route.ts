import express from 'express'
import { ProductController } from '../controller/product.controller';
import { upload } from '../ustils/cloudinary';
import { auth } from '../midllewares/auth';
const  router = express.Router()

router.post('/create-product',auth('ADMIN'), ProductController.createProduct);
router.get('/get-all-products', ProductController.getAllProducts);
router.get('/get-soldPQuantity', ProductController.soldPQuantity);
router.get('/get-product_details/:id', ProductController.getProductById);
router.get('/get-product_ByCategory', ProductController.getProductByCategory);
router.patch('/update-product/:id',upload.any(), ProductController.updateProduct);
router.patch('/soldQuantity/:id', ProductController.totalSell);
router.patch('/decrease-product/:id', ProductController.decreaseProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);

export const  productRoutes = router;