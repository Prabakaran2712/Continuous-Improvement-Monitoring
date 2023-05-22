const mongoose = require("mongoose");

const DiscussionSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", DiscussionSchema);
