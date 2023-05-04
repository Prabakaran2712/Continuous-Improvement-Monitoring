const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Types.ObjectId,
    ref: "Chat",
  },
  sender: {
    type: mongoose.Types.ObjectId,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
