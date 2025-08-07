import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.ObjectId, ref: 'Order' },
  userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['payment', 'payout', 'refund'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentGatewayId: { type: String } // To store the transaction ID from Stripe/Razorpay
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);
