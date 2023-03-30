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
  staff_id: {
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
  courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
  },
  isadmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Teacher", TeacherSchema);

// "name": "Pradesh",
// "email": "pradeshgv@gmail.com",
// "password": "123456",
// "staff_id": "ST5001",
// "address": {
//   "$oid": "641e8ca2ad661ed7a6db76ba"
// },
// "phone_number": "8877663355",
// "courses": {
//   "$oid": ["641e7e87ad661ed7a6db76b3"]
// },
// "department": {
//   "$oid":"6401ef691c39630f2527dcad"
// }
