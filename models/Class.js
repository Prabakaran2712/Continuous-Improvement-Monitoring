const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  teaches: {
    type: mongoose.Types.ObjectId,
    ref: "Teaches",
  },
  topic: {
    type: String,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
