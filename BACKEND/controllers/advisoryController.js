import AdvisoryService from '../models/AdvisoryService.js';
import Gig from '../models/Gig.js';

export const createAdvisoryService = async (req, res, next) => {
  try {
    req.body.advisorId = req.user.id;
    const service = await AdvisoryService.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) { next(error); }
};

export const getAdvisoryServices = async (req, res, next) => {
    try {
        const services = await AdvisoryService.find({ isActive: true }).populate('advisorId', 'profile');
        res.status(200).json({ success: true, count: services.length, data: services });
    } catch (error) { next(error); }
};

export const createGig = async (req, res, next) => {
    try {
        req.body.advisorId = req.user.id;
        const gig = await Gig.create(req.body);
        res.status(201).json({ success: true, data: gig });
    } catch (error) { next(error); }
};

export const getGigs = async (req, res, next) => {
    try {
        const gigs = await Gig.find({ isActive: true }).populate('advisorId', 'profile.firstName profile.lastName');
        res.status(200).json({ success: true, data: gigs });
    } catch (error) { next(error); }
};

export const getMyGigs = async (req, res, next) => {
    try {
        const gigs = await Gig.find({ advisorId: req.user.id });
        res.status(200).json({ success: true, count: gigs.length, data: gigs });
    } catch (error) {
        next(error);
    }
};

export const getGigById = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id).populate('advisorId', 'profile');
        if (!gig) {
            return res.status(404).json({ success: false, message: 'Gig not found' });
        }
        res.status(200).json({ success: true, data: gig });
    } catch (error) {
        next(error);
    }
};

export const updateGig = async (req, res, next) => {
    try {
        let gig = await Gig.findById(req.params.id);
        if (!gig) {
            return res.status(404).json({ success: false, message: 'Gig not found' });
        }
        // Ensure the user is the owner of the gig
        if (gig.advisorId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this gig' });
        }
        gig = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: gig });
    } catch (error) {
        next(error);
    }
};