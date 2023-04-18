const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  present: {
    type: Boolean,
    default: false,
    required: true,
  },
  class: {
    type: mongoose.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
