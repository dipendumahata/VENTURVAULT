import express from 'express';
// NOTE: This controller function would be in /controllers/insightsController.js
import { getMarketTrends } from '../controllers/insightsController.js';

const router = express.Router();

router.route('/market-trends')
  // @route   GET /api/insights/market-trends
  // @desc    Get aggregated, public data on market trends
  // @access  Public
  .get(getMarketTrends);

export default router;