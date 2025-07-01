import { Request, Response } from 'express';
import { Offer } from '../model/Offer';


export const createOffer = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json({ success: true, data: offer });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Create failed' });
  }
};

export const getAllOffers = async (_: Request, res: Response) => {
  const offers = await Offer.find({ isActive: true }).populate('product');
  res.status(200).json({ success: true, data: offers });
};

export const getSingleOffer = async (req: Request, res: Response) => {
  const offer = await Offer.findById(req.params.id).populate('product');
  res.status(200).json({ success: true, data: offer });
};

export const updateOffer = async (req: Request, res: Response) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ success: true, data: offer });
};

export const deleteOffer = async (req: Request, res: Response) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
