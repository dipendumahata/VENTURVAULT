import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, match: [ /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email' ] },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['user', 'business', 'investor', 'banker', 'advisor', 'admin'], default: 'user' },
  profile: {
    firstName: { type: String, required: [true, 'Please provide a first name'] },
    lastName: { type: String, required: [true, 'Please provide a last name'] },
    phone: { type: String },
    avatar: { type: String, default: 'default_avatar.jpg' },
    endorsements: [{
        skill: { type: String },
        endorsedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }],
    isVerified: { type: Boolean, default: false },
    // --- NEW COMMON FIELDS ---
    location: { type: String, default: '' }, // e.g., "Kolkata, West Bengal"
    linkedin: { type: String, default: '' }, // URL to LinkedIn profile
    bio: { type: String, maxlength: 500, default: '' } // A short summary
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

export default mongoose.model('User', UserSchema);