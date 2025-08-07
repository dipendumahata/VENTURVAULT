import mongoose from 'mongoose';

const LoanProductSchema = new mongoose.Schema({
  bankerId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  productName: { type: String, required: true, trim: true },
  loanType: { type: String, enum: ['business_loan', 'startup_loan', 'equipment_loan', 'working_capital'], required: true },
  description: { type: String, required: true },
  interestRate: { min: Number, max: Number, type: { type: String, enum: ['fixed', 'floating'] } },
  loanAmount: { min: Number, max: Number },
  tenure: { min: Number, max: Number }, // in months
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('LoanProduct', LoanProductSchema);
