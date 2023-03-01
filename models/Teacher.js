const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  satff_id: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: mongoose.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  courses: {
    type: [mongoose.Types.ObjectId],
    ref: "Course",
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
  },
});
