import BusinessProposal from '../models/BusinessProposal.js';
import Notification from '../models/Notification.js';
import DealRoom from '../models/DealRoom.js';

const calculateHealthScore = (pitchDeck) => {
    let score = 0;
    const weights = { problem: 15, solution: 20, marketSize: 15, businessModel: 20, competitiveAdvantage: 15, team: 15 };
    if (!pitchDeck) return 0;
    for (const key in weights) {
        if (pitchDeck[key] && pitchDeck[key].length > 20) {
            score += weights[key];
        }
    }
    return score;
};

export const createBusinessProposal = async (req, res, next) => {
  try {
    req.body.businessId = req.user.id;
    req.body.healthScore = calculateHealthScore(req.body.pitchDeck);
    const proposal = await BusinessProposal.create(req.body);
    res.status(201).json({ success: true, data: proposal });
  } catch (error) { next(error); }
};

export const updateBusinessProposal = async (req, res, next) => {
    try {
        let proposal = await BusinessProposal.findById(req.params.id);
        if (!proposal) return res.status(404).json({ success: false, message: 'Proposal not found' });
        if (proposal.businessId.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized to update this proposal' });

        req.body.healthScore = calculateHealthScore(req.body.pitchDeck);
        proposal = await BusinessProposal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: proposal });
    } catch (error) { next(error); }
};

export const getBusinessProposals = async (req, res, next) => {
    try {
        const proposals = await BusinessProposal.find({ status: 'published' }).populate('businessId', 'profile').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: proposals.length, data: proposals });
    } catch (error) { next(error); }
};

export const getBusinessProposalById = async (req, res, next) => {
    try {
        const proposal = await BusinessProposal.findById(req.params.id)
            .populate('businessId', 'profile email') // Populate founder details
            // --- THIS IS THE FIX ---
            // We now also populate the details of each interested investor.
            .populate({
                path: 'interestedInvestors',
                select: 'profile email' // Select the fields we want to send
            });

        if (!proposal) {
            return res.status(404).json({ success: false, message: `Proposal not found with id of ${req.params.id}` });
        }
        res.status(200).json({ success: true, data: proposal });
    } catch (error) {
        next(error);
    }
};

export const expressInterest = async (req, res, next) => {
  try {
    const proposal = await BusinessProposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ success: false, message: 'Proposal not found' });

    if (!proposal.interestedInvestors.includes(req.user.id)) {
      proposal.interestedInvestors.push(req.user.id);
      await proposal.save();

      const notificationMessage = `${req.user.profile.firstName} is interested in your proposal: "${proposal.title}"`;
      const notification = await Notification.create({ userId: proposal.businessId, message: notificationMessage, link: `/proposals/${proposal._id}` });
      
      const io = req.app.get('io');
      io.to(proposal.businessId.toString()).emit('new_notification', notification);
    }
    res.status(200).json({ success: true, data: proposal.interestedInvestors });
  } catch (error) { next(error); }
};

export const acceptInterest = async (req, res, next) => {
    try {
        const { proposalId, investorId } = req.params;
        const proposal = await BusinessProposal.findById(proposalId);

        if (!proposal) return res.status(404).json({ success: false, message: 'Proposal not found' });
        if (proposal.businessId.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });
        if (!proposal.interestedInvestors.includes(investorId)) return res.status(400).json({ success: false, message: 'Investor has not expressed interest' });

        const dealRoom = await DealRoom.create({ proposalId, businessId: req.user.id, investorId });

        const notificationMessage = `Your interest in "${proposal.title}" has been accepted. A deal room is now open.`;
        const notification = await Notification.create({ userId: investorId, message: notificationMessage, link: `/deal-rooms/${dealRoom._id}` });
        const io = req.app.get('io');
        io.to(investorId.toString()).emit('new_notification', notification);

        res.status(201).json({ success: true, data: dealRoom });
    } catch (error) { next(error); }
};

export const getMyProposals = async (req, res, next) => {
    try {
        const proposals = await BusinessProposal.find({ businessId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: proposals.length, data: proposals });
    } catch (error) {
        next(error);
    }
};

export const publishProposal = async (req, res, next) => {
    try {
        let proposal = await BusinessProposal.findById(req.params.id);

        if (!proposal) {
            return res.status(404).json({ success: false, message: 'Proposal not found' });
        }

        if (proposal.businessId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'User not authorized to update this proposal' });
        }

        proposal.status = 'published';
        await proposal.save();

        res.status(200).json({ success: true, data: proposal });
    } catch (error) {
        next(error);
    }
};

