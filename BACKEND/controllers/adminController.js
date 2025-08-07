import User from '../models/User.js';

export const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        
        user.profile.isVerified = true;
        await user.save();
        
        res.status(200).json({ success: true, message: `User ${user.profile.firstName} has been verified.` });
    } catch (error) { next(error); }
};