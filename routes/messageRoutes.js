const {
  createMessage,
  deleteMessage,
  viewMessages,
} = require("../controllers/messageController");

const router = require("express").Router();

//create a message
router.post("/", createMessage);

//delete a message
router.delete("/:id", deleteMessage);

//view all messages of chat
router.get("/:id", viewMessages);

module.exports = router;
