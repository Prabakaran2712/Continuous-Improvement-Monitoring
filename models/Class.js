const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  class_id: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  staff_id: {
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
