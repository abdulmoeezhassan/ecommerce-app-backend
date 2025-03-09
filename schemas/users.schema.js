const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, 
  },
  lastName: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  role: {
    type: String,
    default: "User",
    enum: ["Admin", "Seller", "User"],
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpVerified: {
    type: Boolean,
    default: false,
  },
  imagePath: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    required: true,
    default: "InActive",
    enum: ["Active", "InActive"],
  },
  createdBy: {
    type: String,
  },
  updatedBy: {
    type: String,
  },
  deletedBy: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
