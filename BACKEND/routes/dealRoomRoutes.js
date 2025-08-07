// FILE: /routes/dealRoomRoutes.js

import express from 'express';
import { 
    getDealRoomDetails, 
    getMyDealRooms, 
    postMessageInDealRoom 
} from '../controllers/dealRoomController.js';
import { protect } from '../middleware/auth.js';

// Initialize the router
const router = express.Router();

// Apply the 'protect' middleware to all routes in this file.
// This ensures that only authenticated users can access any of these endpoints.
router.use(protect);

/**
 * @route   GET /api/deal-rooms/
 * @desc    Get all deal rooms for the currently logged-in user.
 * @access  Private
 */
router.route('/')
  .get(getMyDealRooms);

/**
 * @route   GET /api/deal-rooms/:id
 * @desc    Get the full details (including messages and checklist) for a specific deal room.
 * @access  Private (User must be a member of the room)
 */
router.route('/:id')
  .get(getDealRoomDetails);

/**
 * @route   POST /api/deal-rooms/:id/messages
 * @desc    Post a new chat message in a specific deal room.
 * @access  Private (User must be a member of the room)
 */
router.route('/:id/messages')
    .post(postMessageInDealRoom);

// Export the router to be used in the main index.js file
export default router;
