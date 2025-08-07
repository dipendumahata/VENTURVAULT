import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  dealRoomId: { type: mongoose.Schema.ObjectId, ref: 'DealRoom', required: true },
  senderId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('ChatMessage', ChatMessageSchema);

