const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  address_line_1: {
    type: String,
  },
  address_line_2: {
    type: String,
  },
});

module.exports = mongoose.model("Address", AddressSchema);

// "city": "Chennai",
// "state": "Tamil Nadu",
// "country": "India",
// "pincode": "600002",
// "address_line_1": "Chennai",
// "address_line_2": ""
