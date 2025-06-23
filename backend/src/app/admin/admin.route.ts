import express from 'express'
import { AdminController } from './admin.controller';
const router = express.Router();
router.get('/get_all_user',AdminController.getAllUser )
router.patch('/update_user_role/:id',AdminController.updateUser )
router.delete('/delete_user/:id',AdminController.deleteUser )
export const adminRoute = router