import mongoose from 'mongoose';

const DealRoomSchema = new mongoose.Schema({
  proposalId: { type: mongoose.Schema.ObjectId, ref: 'BusinessProposal', required: true },
  businessId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  investorId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'negotiating', 'closed', 'archived'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('DealRoom', DealRoomSchema);
