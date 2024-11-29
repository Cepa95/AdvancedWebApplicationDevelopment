const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  wishlist: [{
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plant'
    }
  }],
  cart: [{
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plant'
    },
    quantity: {
      type: Number,
      min: 1
    }
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;