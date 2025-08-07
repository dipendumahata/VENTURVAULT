import mongoose from 'mongoose';

const BusinessProposalSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  title: { type: String, required: [true, 'Please add a title'], trim: true, maxlength: 100 },
  description: { type: String, required: [true, 'Please add a short summary'] },
  category: { type: String, required: [true, 'Please add a category'] },
  pitchDeck: {
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    marketSize: { type: String, default: '' },
    businessModel: { type: String, default: '' },
    competitiveAdvantage: { type: String, default: '' },
    team: { type: String, default: '' }
  },
  healthScore: { type: Number, default: 0 },
  fundingDetails: {
    totalFundingRequired: { type: Number, required: true },
    equityOffered: { type: Number, required: true }
  },
  status: { type: String, enum: ['draft', 'published', 'funded', 'closed'], default: 'draft' },
  interestedInvestors: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('BusinessProposal', BusinessProposalSchema);
