"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOffer = exports.updateOffer = exports.getSingleOffer = exports.getAllOffers = exports.createOffer = void 0;
const Offer_1 = require("../model/Offer");
const createOffer = async (req, res) => {
    try {
        const offer = await Offer_1.Offer.create(req.body);
        res.status(201).json({ success: true, data: offer });
    }
    catch (err) {
        res.status(400).json({ success: false, message: 'Create failed' });
    }
};
exports.createOffer = createOffer;
const getAllOffers = async (_, res) => {
    const offers = await Offer_1.Offer.find({ isActive: true }).populate('product');
    res.status(200).json({ success: true, data: offers });
};
exports.getAllOffers = getAllOffers;
const getSingleOffer = async (req, res) => {
    const offer = await Offer_1.Offer.findById(req.params.id).populate('product');
    res.status(200).json({ success: true, data: offer });
};
exports.getSingleOffer = getSingleOffer;
const updateOffer = async (req, res) => {
    const offer = await Offer_1.Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: offer });
};
exports.updateOffer = updateOffer;
const deleteOffer = async (req, res) => {
    await Offer_1.Offer.findByIdAndDelete(req.params.id);
    res.status(204).send();
};
exports.deleteOffer = deleteOffer;
