
import express from 'express'
import { meController } from './me.controller'
const router = express.Router()
router.get("/:id", meController.getSinglUser )

export const meRoute  = router;