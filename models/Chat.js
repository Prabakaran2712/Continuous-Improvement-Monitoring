const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    teaches: {
      type: mongoose.Types.ObjectId,
      ref: "Teaches",
    },
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
