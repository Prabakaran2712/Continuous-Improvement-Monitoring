const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  exam_name: {
    type: String,
    required: true,
  },
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
    type: String,
    required: true,
  },
  exam_type: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  batch: {
    type: mongoose.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  total_marks: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Exam", ExamSchema);
