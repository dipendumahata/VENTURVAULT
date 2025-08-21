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

export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.profile.firstName = req.body.firstName || user.profile.firstName;
            user.profile.lastName = req.body.lastName || user.profile.lastName;
            user.profile.phone = req.body.phone || user.profile.phone;

            user.profile.location = req.body.location || user.profile.location;
            user.profile.linkedin = req.body.linkedin || user.profile.linkedin;
            user.profile.bio = req.body.bio || user.profile.bio;

            // Note: Email and role changes should be handled by a separate, more secure process.
            // Password changes should have their own dedicated endpoint.

            const updatedUser = await user.save();

            res.status(200).json({
                success: true,
                data: updatedUser
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};