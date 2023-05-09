const Exam = require("../models/Exam");
const Mark = require("../models/Mark");

//get all exams
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({})
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
      .populate({ path: "teaches", populate: { path: "batch" } });
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get exam by id
const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
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
      .populate({ path: "teaches", populate: { path: "batch" } });
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new exam
const addNewExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    const examResponse = await Exam.findById(exam._id)
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
      .populate({ path: "teaches", populate: { path: "batch" } });
    res.status(200).json(examResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all exams by teacher id in teaches
const getExamsByTeacherId = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate({
        path: "teaches",
        populate: { path: "course", populate: { path: "department" } },
      })
      .populate({
        path: "teaches",

        populate: {
          path: "teacher",
          populate: { path: "department address" },
          match: { _id: req.params.id },
        },
      })
      .populate({
        path: "teaches",
        populate: { path: "students", populate: { path: "department batch" } },
      })
      .populate({ path: "teaches", populate: { path: "batch" } });

    //remove values that have teacher null
    for (let i = 0; i < exams.length; i++) {
      if (exams[i].teaches.teacher == null) {
        exams.splice(i, 1);
        i--;
      }
    }

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update exam
const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (exam) {
      exam.course = req.body.course;
      exam.exam_code = req.body.exam_code;
      exam.exam_name = req.body.exam_name;
      exam.teacher = req.body.teacher;
      exam.exam_date = req.body.exam_date;
      exam.exam_time = req.body.exam_time;
      exam.exam_duration = req.body.exam_duration;
      exam.exam_type = req.body.exam_type;
      exam.batch = req.body.batch;
      exam.department = req.body.department;
      exam.semester = req.body.semester;
      exam.total_marks = req.body.total_marks;
      const updatedExam = await exam.save();
      res.status(200).json(updatedExam);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete exam
const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (exam) {
      await exam.remove();
      //delete marks of this exam
      await Mark.deleteMany({ exam: req.params.id });
      res.status(200).json({ message: "Exam deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get exams between two dates
const getExamsBetweenDates = async (req, res) => {
  try {
    const exams = await Exam.find({
      exam_date: { $gte: req.params.start_date, $lte: req.params.end_date },
    })
      .populate("course")
      .populate("teacher")
      .populate("department");
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllExams,
  getExamById,
  getExamsByTeacherId,
  addNewExam,
  updateExam,
  deleteExam,
  getExamsBetweenDates,
};
