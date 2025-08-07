import express from 'express';
import {
  createBusinessProposal,
  updateBusinessProposal,
  getBusinessProposals,
  getBusinessProposalById, // Import the new function
  expressInterest,
  acceptInterest,
  getMyProposals,
  publishProposal
} from '../controllers/businessController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.route('/proposals')
  .post(authorize('business'), createBusinessProposal)
  .get(getBusinessProposals);

router.route('/proposals/:id')
  .get(getBusinessProposalById) // ADDED THE GET METHOD
  .put(authorize('business'), updateBusinessProposal);

router.route('/proposals/:id/interest')
  .post(authorize('investor'), expressInterest);

router.route('/proposals/:proposalId/accept/:investorId')
  .post(authorize('business'), acceptInterest);
  
router.route('/proposals/:id/publish')
    .put(authorize('business'), publishProposal);

router.route('/my-proposals')
    .get(authorize('business'), getMyProposals);

export default router;
