import mongoose from 'mongoose';

const InvestorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, unique: true },
  investorType: { type: String, enum: ['angel', 'vc', 'private_equity', 'individual'], required: true },
  investmentCapacity: { minInvestment: Number, maxInvestment: Number },
  preferredSectors: [String],
  isAccredited: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('InvestorProfile', InvestorProfileSchema);