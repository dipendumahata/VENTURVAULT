// FILE: /controllers/dealRoomController.js

import DealRoom from '../models/DealRoom.js';
import ChatMessage from '../models/ChatMessage.js';
import ChecklistItem from '../models/ChecklistItem.js';

/**
 * @desc    Get all deal rooms for the currently logged-in user
 * @route   GET /api/deal-rooms/
 * @access  Private
 */
export const getMyDealRooms = async (req, res, next) => {
    try {
        // Find all DealRoom documents where the current user's ID matches either the businessId or the investorId
        const dealRooms = await DealRoom.find({
            $or: [{ businessId: req.user.id }, { investorId: req.user.id }]
        })
        .populate('proposalId', 'title') // Populate the proposal's title
        .populate('businessId', 'profile') // Populate the business owner's profile
        .populate('investorId', 'profile') // Populate the investor's profile
        .sort({ updatedAt: -1 }); // Sort by the most recently active

        res.status(200).json({ success: true, count: dealRooms.length, data: dealRooms });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get details for a single Deal Room
 * @route   GET /api/deal-rooms/:id
 * @access  Private (User must be a member of the room)
 */
export const getDealRoomDetails = async (req, res, next) => {
    try {
        const dealRoom = await DealRoom.findById(req.params.id)
            .populate('businessId', 'profile')
            .populate('investorId', 'profile')
            .populate('proposalId', 'title');

        // Security check: Ensure the requested deal room exists
        if (!dealRoom) {
            return res.status(404).json({ success: false, message: 'Deal Room not found.' });
        }

        // Security check: Ensure the current user is part of this deal room before proceeding
        if (dealRoom.businessId._id.toString() !== req.user.id && dealRoom.investorId._id.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'You are not authorized to view this deal room.' });
        }

        // Fetch associated chat messages and checklist items
        const messages = await ChatMessage.find({ dealRoomId: req.params.id }).sort('createdAt').populate('senderId', 'profile');
        const checklist = await ChecklistItem.find({ dealRoomId: req.params.id }).sort('createdAt');

        res.status(200).json({ success: true, data: { dealRoom, messages, checklist } });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Post a new chat message in a deal room
 * @route   POST /api/deal-rooms/:id/messages
 * @access  Private (User must be a member of the room)
 */
export const postMessageInDealRoom = async (req, res, next) => {
    try {
        const { message } = req.body;
        const dealRoomId = req.params.id;

        if (!message || message.trim() === '') {
            return res.status(400).json({ success: false, message: 'Message cannot be empty.' });
        }

        // Authorization check: Find the deal room to ensure the user is a member
        const dealRoom = await DealRoom.findById(dealRoomId);
        if (!dealRoom || (dealRoom.businessId.toString() !== req.user.id && dealRoom.investorId.toString() !== req.user.id)) {
            return res.status(403).json({ success: false, message: 'Not authorized to post in this room' });
        }

        // Create and save the new chat message
        const chatMessage = await ChatMessage.create({
            dealRoomId,
            senderId: req.user.id,
            message
        });

        // Populate the sender's details before sending it over Socket.IO
        const populatedMessage = await chatMessage.populate('senderId', 'profile');
        
        // Emit the new message to all clients in the specific deal room's socket channel
        const io = req.app.get('io');
        io.to(dealRoomId.toString()).emit('new_chat_message', populatedMessage);

        // Send a success response back to the original sender
        res.status(201).json({ success: true, data: populatedMessage });
    } catch (error) {
        next(error);
    }
};
