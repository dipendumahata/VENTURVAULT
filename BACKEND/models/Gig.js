import mongoose from 'mongoose';

const GigSchema = new mongoose.Schema({
  advisorId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  title: { type: String, required: [true, 'Please provide a title'] },
  description: { type: String, required: [true, 'Please provide a description'] },
  price: { type: Number, required: [true, 'Please provide a price'] },
  category: { type: String, required: [true, 'Please provide a category'] },
  deliveryTime: { type: Number, required: [true, 'Please provide a delivery time in days'] },
  platformFee: { type: Number, default: 15 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Gig', GigSchema);
