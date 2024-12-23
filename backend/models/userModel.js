import mongoose from 'mongoose';


// Define a mongoose schema and model for a user
const userSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },

  email: {
    type: String, required: true
  },

  password: {
    type: String, required: true
  },

  isAdmin: {
    type: Boolean, default:false
  }

}, {
  timestamps: true
});

const userModel = mongoose.model('users', userSchema);

export default userModel;