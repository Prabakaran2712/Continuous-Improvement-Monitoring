const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  teaches: {
    type: mongoose.Types.ObjectId,
    ref: "Teaches",
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

mongoose.model("Grade", GradeSchema);
