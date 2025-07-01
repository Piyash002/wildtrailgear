import express from 'express'
import { reviewController } from '../controller/review.controller';
import { auth } from '../midllewares/auth';

const router = express.Router()
router.post('/add-review/:id',auth("USER"), reviewController.addReview)

export const reviewRoute = router;