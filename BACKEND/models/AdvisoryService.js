import mongoose from 'mongoose';

const AdvisoryServiceSchema = new mongoose.Schema({
  advisorId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, enum: ['consultation', 'mentorship', 'legal_advice', 'financial_planning'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  expertise: [String],
  pricing: { type: { type: String, enum: ['hourly', 'fixed'] }, amount: Number },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('AdvisoryService', AdvisoryServiceSchema);