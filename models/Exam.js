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
    type: String,
    required: true,
  },
  exam_type: {
    type: String,
    required: true,
    enum: ["Assessment-1", "Assessment-2", "End-Semester"],
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

// "exam_name": "Python",
// "exam_code": "EX500",
// "exam_date": "12/05/2023",
// "exam_time": "9:30AM",
// "exam_duration": "3 hrs",
// "exam_type": "Offline",
// "course": {
//   "$oid": "641e7e87ad661ed7a6db76b3"
// },
// "batch": {
//   "$oid": "641e7d31ad661ed7a6db76b1"
// },
// "department": {
//   "$oid": "6401ef691c39630f2527dcad"
// },
// "total_marks": 100,
// "semester":4
