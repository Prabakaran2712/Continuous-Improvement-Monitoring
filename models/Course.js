const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  subject_code: {
    type: String,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    required: true,
    min: 0,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
