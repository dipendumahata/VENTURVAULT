import express from 'express';
import {
    getMyInvestorProfile,
    updateInvestorProfile,
    getInvestorPortfolio // Import the new controller function
} from '../controllers/investorController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes are private and restricted to the 'investor' role
router.use(protect, authorize('investor'));

router.route('/profile')
  .get(getMyInvestorProfile)
  .put(updateInvestorProfile);

// NEW ROUTE for an investor to get their portfolio
router.route('/portfolio')
    .get(getInvestorPortfolio);

export default router;