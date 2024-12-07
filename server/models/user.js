const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  wishlist: [
    {
      plantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
      },
    },
  ],
  cart: [
    {
      plantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
      },
      quantity: {
        type: Number,
        min: 1,
      },
    },
  ],
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
