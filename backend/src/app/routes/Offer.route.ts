import express from 'express';
import { createOffer, deleteOffer, getAllOffers, getSingleOffer, updateOffer } from '../controller/OfferController';

const router = express.Router();

router.get('/', getAllOffers);
router.get('/:id', getSingleOffer);
router.post('/', createOffer);
router.patch('/:id', updateOffer);
router.delete('/:id', deleteOffer);

export const offerRoutes = router;
