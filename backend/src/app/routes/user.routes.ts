import express from 'express'
import { UserController } from '../controller/user.controller';
const  router = express.Router()
router.post('/register-user', UserController.registerUSer)
router.post('/login-user', UserController.loginUser)
router.post('/refresh-token', UserController.refreshToken)

export const  UserRoutes = router;