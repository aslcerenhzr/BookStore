import mongoose from 'mongoose';

const authorSchema = mongoose.Schema(
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

export const Author = mongoose.model('Author', authorSchema);
