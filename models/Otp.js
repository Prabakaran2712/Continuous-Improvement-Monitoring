const mongoose = require("mongoose");

//otp Model
const otpSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },

  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "5m",
  },
});

module.exports = mongoose.model("Otp", otpSchema);
