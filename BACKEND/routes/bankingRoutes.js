import express from 'express';
// NOTE: These controller functions would be in /controllers/bankingController.js
import { createLoanProduct, 
    getLoanProducts, 
    getMyLoanProducts, 
    getLoanProductById, 
    updateLoanProduct } from '../controllers/bankingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/products')
  .post(authorize('banker'), createLoanProduct)
  .get(getLoanProducts);

router.route('/products/:id')
    .get(getLoanProductById)
    .put(authorize('banker'), updateLoanProduct);

router.route('/my-products')
  .get(authorize('banker'), getMyLoanProducts);

export default router;