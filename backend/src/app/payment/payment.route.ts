import express from 'express'
import { paymentController } from './payment.controller';
const router = express.Router()


router.post('/cod', paymentController.CodPayment)
router.post('/;id', paymentController.GetStatus)


export const payment = router;