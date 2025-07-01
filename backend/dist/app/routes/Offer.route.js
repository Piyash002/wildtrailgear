"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const OfferController_1 = require("../controller/OfferController");
const router = express_1.default.Router();
router.get('/', OfferController_1.getAllOffers);
router.get('/:id', OfferController_1.getSingleOffer);
router.post('/', OfferController_1.createOffer);
router.patch('/:id', OfferController_1.updateOffer);
router.delete('/:id', OfferController_1.deleteOffer);
exports.offerRoutes = router;
