const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  start_year: {
    type: Number,
    required: true,
  },
  end_year: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

module.exports = mongoose.model("Batch", BatchSchema);
