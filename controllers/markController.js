const Mark = require("../models/Mark");

//get all marks
const getAllMarks = async (req, res) => {
  try {
    const marks = await Mark.find({})
      .populate("student")
      .populate([{ path: "teacher", populate: { path: "department" } }])
      .populate([
        {
          path: "exam",
          populate: { path: "course" },
        },
        {
          path: "exam",
          populate: { path: "department" },
        },
      ]);
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get mark by id
const getMarkById = async (req, res) => {
  try {
    const mark = await Mark.findById(req.params.id)
      .populate("student")
      .populate("teacher")
      .populate("exam");
    res.status(200).json(mark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get mark by student roll_number
const getMarkByStudentRollNumber = async (req, res) => {
  try {
    const mark = await Mark.find({})
      .populate({
        path: "student",
        match: { roll_number: req.params.roll_number },
      })
      .populate("teacher")
      .populate("exam");
    res.status(200).json(mark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get mark by teacher staff_id
const getMarkByTeacherStaffId = async (req, res) => {
  try {
    const mark = await Mark.find({})
      .populate({
        path: "teacher",
        match: { staff_id: req.params.staff_id },
      })
      .populate("student")
      .populate("exam");
    res.status(200).json(mark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get mark by course
const getMarkByCourse = async (req, res) => {
  try {
    const mark = await Mark.find({})
      .populate({
        path: "exam",
        match: { course: req.params.course },
      })
      .populate("student")
      .populate("teacher");
    res.status(200).json(mark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get mark by exam
const getMarkByExam = async (req, res) => {
  try {
    const mark = await Mark.find({})
      .populate({
        path: "exam",
        match: { name: req.params.name },
      })
      .populate("student")
      .populate("teacher");
    res.status(200).json(mark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new mark
const addNewMark = async (req, res) => {
  try {
    const mark = new Mark(req.body);
    await mark.save();
    res.status(200).json(mark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new marks for many students
const addNewMarks = async (req, res) => {
  try {
    const marks = req.body;
    await Mark.insertMany(marks);
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update mark by id
const updateMark = async (req, res) => {
  try {
    const mark = await Mark.findById(req.params.id);
    if (mark) {
      mark.student = req.body.student;
      mark.teacher = req.body.teacher;
      mark.exam = req.body.exam;
      mark.marks = req.body.marks;
      await mark.save();
      res.status(200).json(mark);
    } else {
      res.status(404).json({ message: "Mark not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete mark by id
const deleteMark = async (req, res) => {
  try {
    const mark = await Mark.findById(req.params.id);
    if (mark) {
      await mark.remove();
      res.status(200).json({ message: "Mark deleted" });
    } else {
      res.status(404).json({ message: "Mark not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMarks,
  getMarkById,
  getMarkByStudentRollNumber,
  getMarkByTeacherStaffId,
  getMarkByCourse,
  getMarkByExam,
  addNewMark,
  addNewMarks,
  updateMark,
  deleteMark,
};
