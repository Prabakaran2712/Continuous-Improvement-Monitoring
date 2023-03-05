const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  batch: {
    type: mongoose.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
