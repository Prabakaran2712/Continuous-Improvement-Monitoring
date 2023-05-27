const {
  createDiscussion,
  deleteDiscussion,
  viewDiscussions,
  viewDiscussionsTeacher,
  getDiscussion,
  closeDiscussion,
} = require("../controllers/discussionController");

const router = require("express").Router();

//create a Discussion
router.post("/", createDiscussion);

//delete a Discussion
router.delete("/:id", deleteDiscussion);

//view all Discussions of student
router.get("/student/:id", viewDiscussions);

//view all Discussions of teacher  with teacher id in teaches
router.get("/teacher/:id", viewDiscussionsTeacher);

//view a Discussion
router.get("/:id", getDiscussion);

//close a Discussion
router.put("/close/:id", closeDiscussion);

module.exports = router;
