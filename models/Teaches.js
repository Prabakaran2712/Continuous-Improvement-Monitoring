const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },
  semester: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Teaches", TeacherSchema);
