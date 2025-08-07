import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login a user and get a token
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Get current logged-in user's profile
// @access  Private
router.get('/me', protect, getMe);

export default router;