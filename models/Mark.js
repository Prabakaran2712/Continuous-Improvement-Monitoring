const mongoose = require("mongoose");

const MarkSchema = new mongoose.Schema({
  student: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
  exam: {
    type: mongoose.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "Teacher",
  },
});

module.exports = mongoose.model("Mark", MarkSchema);
