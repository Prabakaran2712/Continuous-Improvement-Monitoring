const Chat = require("../models/Chat");

//create a chat
const createChat = async (req, res) => {
  try {
    const chat = new Chat({
      teaches: req.body.teaches,
      student: req.body.student,
      title: req.body.title,
    });
    await chat.save();
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};
//delete a chat
const deleteChat = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.status(200).json("Chat has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//view all chats of student
const viewChats = async (req, res) => {
  try {
    const chats = await Chat.find({ student: req.params.id })
      .populate({
        path: "teaches",
        populate: { path: "course", populate: { path: "department" } },
      })
      .populate({
        path: "teaches",
        populate: { path: "teacher", populate: { path: "department address" } },
      })
      .populate({
        path: "teaches",
        populate: { path: "students", populate: { path: "department batch" } },
      })
      .populate({ path: "teaches", populate: { path: "batch" } })
      .populate({ path: "student", populate: { path: "department batch" } });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
};

//view all chats of teacher  with teacher id in teaches
const viewChatsTeacher = async (req, res) => {
  try {
    const chats = await Chat.find()
      .populate({
        path: "teaches",
        populate: { path: "teacher", populate: "address department" },
        match: { _id: req.params.id },
      })
      .populate({
        path: "teaches",
        populate: { path: "course", populate: { path: "department" } },
      })
      .populate({
        path: "teaches",
        populate: {
          path: "students",
          populate: { path: "department batch" },
        },
      })
      .populate({ path: "student", populate: { path: "department batch" } });
    console.log(chats);
    //remove objects with teaches as null
    const filteredChats = chats.filter((chat) => chat.teaches !== null);
    res.status(200).json(filteredChats);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createChat, deleteChat, viewChats, viewChatsTeacher };
