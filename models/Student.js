const mongoose = require("mongoose");
const Department = require("./Department");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roll_number: {
      type: String,
      required: true,
    },
    address_id: {
      type: mongoose.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    courses: {
      type: [mongoose.Types.ObjectId],
      ref: "Course",
    },
    marks: {
      type: [mongoose.Types.ObjectId],
      ref: "Mark",
    },
    attendance: {
      type: [mongoose.Types.ObjectId],
      ref: "Attendance",
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
    },
    batch: {
      type: mongoose.Types.ObjectId,
      ref: "Batch",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
