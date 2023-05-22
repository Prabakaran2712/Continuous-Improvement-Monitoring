const Discussion = require("../models/Discussion");

//create a Discussion
const createDiscussion = async (req, res) => {
  try {
    const resDiscussion = new Discussion({
      teaches: req.body.teaches,
      student: req.body.student,
      title: req.body.title,
    });
    await resDiscussion.save();
    res.status(200).json(resDiscussion);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
//delete a Discussion
const deleteDiscussion = async (req, res) => {
  try {
    await Discussion.findByIdAndDelete(req.params.id);
    res.status(200).json("Discussion has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//view all Discussions of student
const viewDiscussions = async (req, res) => {
  try {
    const Discussions = await Discussion.find({ student: req.params.id })
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
    res.status(200).json(Discussions);
  } catch (err) {
    res.status(500).json(err);
  }
};

//view all Discussions of teacher  with teacher id in teaches
const viewDiscussionsTeacher = async (req, res) => {
  try {
    const Discussions = await Discussion.find()
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
    console.log(Discussions);
    //remove objects with teaches as null
    const filteredDiscussions = Discussions.filter(
      (Discussion) => Discussion.teaches !== null
    );
    res.status(200).json(filteredDiscussions);
  } catch (err) {
    res.status(500).json(err);
  }
};
//get Discussion details by id
const getDiscussion = async (req, res) => {
  try {
    const details = await Discussion.findById(req.params.id)

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
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createDiscussion,
  deleteDiscussion,
  viewDiscussions,
  viewDiscussionsTeacher,
  getDiscussion,
};
