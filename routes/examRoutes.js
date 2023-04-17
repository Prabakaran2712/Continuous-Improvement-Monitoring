const {
  getAllExams,
  getExamById,
  getExamsByTeacherId,
  addNewExam,
  updateExam,
  deleteExam,
  getExamsBetweenDates,
} = require("../controllers/examController");

const router = require("express").Router();

//get all exams
router.get("/", getAllExams);

//get exam by id
router.get("/:id", getExamById);

//get exams by teacher id
router.get("/teacher/:id", getExamsByTeacherId);

//add new exam
router.post("/", addNewExam);

//update exam
router.put("/:id", updateExam);

//delete exam
router.delete("/:id", deleteExam);

//get exams between dates
router.get("/date/:start_date/:end_date", getExamsBetweenDates);

module.exports = router;
