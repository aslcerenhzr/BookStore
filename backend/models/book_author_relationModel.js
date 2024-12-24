import mongoose from 'mongoose';

const bookAuthorPublisherSchema = mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book', 
      required: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    publisher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publisher',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BookAuthorPublisher = mongoose.model('BookAuthorPublisher', bookAuthorPublisherSchema);