import mongoose from 'mongoose';

const LoanApplicationSchema = new mongoose.Schema({
  loanProductId: {
    type: mongoose.Schema.ObjectId,
    ref: 'LoanProduct',
    required: true
  },
  businessId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  bankerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'approved', 'rejected'],
    default: 'submitted'
  },
  // In a real application, you would store URLs to documents uploaded to a
  // service like AWS S3 or Cloudinary.
  submittedDocuments: {
    type: [String], // e.g., ['url_to_business_plan.pdf', 'url_to_bank_statement.pdf']
    default: []
  },
  applicationDetails: {
      type: String, // A field for the applicant to add extra notes or details.
      required: true
  }
}, { timestamps: true });

export default mongoose.model('LoanApplication', LoanApplicationSchema);
