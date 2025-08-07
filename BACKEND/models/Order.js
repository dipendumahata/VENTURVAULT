import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  gigId: { type: mongoose.Schema.ObjectId, ref: 'Gig', required: true },
  businessId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  advisorId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed', 'cancelled', 'disputed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  commission: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  amountPayableToAdvisor: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
