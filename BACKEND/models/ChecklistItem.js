import mongoose from 'mongoose';

const ChecklistItemSchema = new mongoose.Schema({
  dealRoomId: { type: mongoose.Schema.ObjectId, ref: 'DealRoom', required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('ChecklistItem', ChecklistItemSchema);
