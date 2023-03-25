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

// "start_year": 2002,
//   "end_year":2028,
//   "degree":"B.Tech",
//   "department":{
//     "$oid":"6401ef691c39630f2527dcad"
//   }
