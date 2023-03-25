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

// "subject_code": "IT5004",
// "credits": 80,
// "name": "prasath",
// "department": {
//   "$oid": "6401ef691c39630f2527dcad"
// }
