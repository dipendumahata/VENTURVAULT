import BusinessProposal from '../models/BusinessProposal.js';
import Gig from '../models/Gig.js';

export const getMarketTrends = async (req, res, next) => {
    try {
        const topProposalCategories = await BusinessProposal.aggregate([
            { $match: { status: 'published' } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        const topGigCategories = await Gig.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            success: true,
            data: { topProposalCategories, topGigCategories }
        });
    } catch (error) { next(error); }
};