import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // 1 ile 5 arasında puanlama yapılabilir
    },
  },
  {
    timestamps: true, // Yorum tarihi
  }
);

export const Comment = mongoose.model('Comment', commentSchema);