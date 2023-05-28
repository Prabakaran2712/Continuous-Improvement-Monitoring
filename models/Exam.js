const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  exam_code: {
    type: String,
    required: true,
    unique: true,
  },
  exam_date: {
    type: Date,
    required: true,
  },
  exam_time: {
    type: String,
    required: true,
  },
  exam_duration: {
    type: Number,
    required: true,
  },
  exam_type: {
    type: String,
    required: true,
    enum: ["Assessment-1", "Assessment-2", "End-Semester"],
  },
  teaches: {
    type: mongoose.Types.ObjectId,
    ref: "Teaches",
    required: true,
  },
  total_marks: {
    type: Number,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Exam", ExamSchema);
