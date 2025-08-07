import User from '../models/User.js';

export const endorseUser = async (req, res, next) => {
    try {
        const userToEndorse = await User.findById(req.params.userId);
        if (!userToEndorse) return res.status(404).json({ success: false, message: 'User not found' });
        if (req.user.id === req.params.userId) return res.status(400).json({ success: false, message: 'You cannot endorse yourself' });

        const { skill } = req.body;
        if (!skill) return res.status(400).json({ success: false, message: 'Please provide a skill to endorse' });

        const alreadyEndorsed = userToEndorse.profile.endorsements.find(e => e.endorsedBy.toString() === req.user.id && e.skill === skill);
        if (alreadyEndorsed) return res.status(400).json({ success: false, message: 'You have already endorsed this user for this skill' });

        userToEndorse.profile.endorsements.push({ skill, endorsedBy: req.user.id });
        await userToEndorse.save();
        res.status(200).json({ success: true, data: userToEndorse.profile.endorsements });
    } catch (error) { next(error); }
};