import InvestorProfile from '../models/InvestorProfile.js';
import BusinessProposal from '../models/BusinessProposal.js';

export const getMyInvestorProfile = async (req, res, next) => {
    try {
        let profile = await InvestorProfile.findOne({ userId: req.user.id }).populate('userId', 'profile email');
        if (!profile) {
            profile = await InvestorProfile.create({ userId: req.user.id, investorType: 'individual' });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (error) { next(error); }
};

export const updateInvestorProfile = async (req, res, next) => {
    try {
        const profile = await InvestorProfile.findOneAndUpdate({ userId: req.user.id }, req.body, { new: true, runValidators: true });
        if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
        res.status(200).json({ success: true, data: profile });
    } catch (error) { next(error); }
};
export const getInvestorPortfolio = async (req, res, next) => {
    try {
        // Find all proposals where the current investor's ID is in the 'interestedInvestors' array
        const portfolioProposals = await BusinessProposal.find({
            interestedInvestors: req.user.id
        }).populate('businessId', 'profile.firstName profile.lastName');

        res.status(200).json({
            success: true,
            count: portfolioProposals.length,
            data: portfolioProposals
        });
    } catch (error) {
        next(error);
    }
};

