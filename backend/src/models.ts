import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  imageData: {
    type: String,
    required: true
  },
  shareId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800 // 7 days
  }
});

export const Photo = mongoose.model('Photo', PhotoSchema);