import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

// NEW ROUTE to get orders for the current user
router.route('/my-orders')
    .get(getMyOrders);

router.route('/gigs/:gigId')
  .post(authorize('business'), createOrder);

export default router;