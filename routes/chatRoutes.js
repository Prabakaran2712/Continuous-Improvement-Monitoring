const {
  createChat,
  deleteChat,
  viewChats,
  viewChatsTeacher,
  getChat,
} = require("../controllers/chatController");

const router = require("express").Router();

//create a chat
router.post("/", createChat);

//delete a chat
router.delete("/:id", deleteChat);

//view all chats of student
router.get("/student/:id", viewChats);

//view all chats of teacher  with teacher id in teaches
router.get("/teacher/:id", viewChatsTeacher);

//view a chat
router.get("/:id", getChat);

module.exports = router;
