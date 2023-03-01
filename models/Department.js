const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  dept_name: {
    type: String,
    required: true,
  },
  dept_code: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Department", DepartmentSchema);
