const {
  getAllMarks,
  getMarkById,
  getMarkByStudentRollNumber,
  getMarkByTeacherStaffId,
  getMarkByCourse,
  getMarkByExam,
  addNewMark,
  getMarkByStudentId,
  addMoreMarks,
  updateMark,
  deleteMark,
} = require("../controllers/markController");

const router = require("express").Router();

//get all marks
router.get("/", getAllMarks);

//get mark by id
router.get("/:id", getMarkById);

//get mark by student id
router.get("/student/:id", getMarkByStudentId);

//get mark by student roll number
router.get("/student/rno/:roll_number", getMarkByStudentRollNumber);

//get mark by teacher staff id
router.get("/teacher/:staff_id", getMarkByTeacherStaffId);

//get mark by course
router.get("/course/:id", getMarkByCourse);

//get mark by exam
router.get("/exam/:id", getMarkByExam);

//add new mark
router.post("/", addNewMark);

//add new marks
router.post("/marks", addMoreMarks);

//update mark
router.put("/:id", updateMark);

//delete mark
router.delete("/:id", deleteMark);

module.exports = router;
