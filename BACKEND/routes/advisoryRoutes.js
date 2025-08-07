// NOTE: These controller functions would be in /controllers/advisoryController.js
import express from 'express';
import { createGig, getGigs, createAdvisoryService, getAdvisoryServices, getMyGigs, getGigById, updateGig } from '../controllers/advisoryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

// Routes for long-term advisory services
router.route('/services')
  .post(authorize('advisor'), createAdvisoryService)
  .get(getAdvisoryServices);

// Routes for short-term, commission-based "Gigs"
router.route('/gigs')
  .post(authorize('advisor'), createGig)
  .get(getGigs);

// NEW ROUTE for an advisor to get their own gigs
router.route('/my-gigs')
  .get(authorize('advisor'), getMyGigs);

// NEW routes for single gig operations
router.route('/gigs/:id')
    .get(getGigById)
    .put(authorize('advisor'), updateGig);

export default router;