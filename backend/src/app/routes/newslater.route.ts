import express from 'express'
import { newsLaterController } from '../controller/NewsLater';
const router = express.Router();

router.post('/subscribe', newsLaterController.subscribe )

export const newsLater = router;