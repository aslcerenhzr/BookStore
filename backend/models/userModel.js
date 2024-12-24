import mongoose from 'mongoose';

// Define a mongoose schema and model for a user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Email benzersiz olmalı
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  favoriteBooks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Book', // Book koleksiyonuna referans verir
    default: []
  }
}, {
  timestamps: true
});

const userModel = mongoose.model('users', userSchema);

export default userModel;  // ES6 ile dışa aktar
