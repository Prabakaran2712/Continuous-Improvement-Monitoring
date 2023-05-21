const Message = require("../models/Message");

//create a message
const createMessage = async (req, res) => {
  try {
    const message = new Message({
      discussion: req.body.discussion,
      sender: req.body.sender,
      message: req.body.message,
    });
    await message.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete a message with message id
const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json("Message has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//view all messages of chat
const viewMessages = async (req, res) => {
  try {
    const messages = await Message.find({ discussion: req.params.id });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createMessage, deleteMessage, viewMessages };
