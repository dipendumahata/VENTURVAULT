import express from 'express';
// NOTE: This controller function would be in /controllers/userController.js
import { endorseUser,updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/:userId/endorse')
  // @route   POST /api/users/:userId/endorse
  // @desc    Endorse another user for a specific skill
  // @access  Private
  .post(endorseUser);

router.route('/profile')
  .put(updateUserProfile);

export default router;