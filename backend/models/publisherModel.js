import mongoose from 'mongoose';

const publisherSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Publisher = mongoose.model('Publisher', publisherSchema);