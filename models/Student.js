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
      unique: true,
    },
    phone: {
      type: String,
      required: true,
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
    address: {
      type: mongoose.Types.ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);

//add address later
