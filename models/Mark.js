const mongoose = require("mongoose");

const MarkSchema = new mongoose.Schema({
  student: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  mark: {
    type: Number,
    default: 0,
  },
  exam: {
    type: mongoose.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
});

module.exports = mongoose.model("Mark", MarkSchema);
