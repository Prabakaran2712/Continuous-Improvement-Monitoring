const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    discussion: {
      type: mongoose.Types.ObjectId,
      ref: "Discussion",
    },
    sender: {
      type: mongoose.Types.ObjectId,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
