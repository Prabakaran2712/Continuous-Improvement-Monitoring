const {
  getAllStudents,
  getStudentByRollNumber,
  getStudentById,
  addNewStudent,
  updateStudent,
  deleteStudent,
  addCourseToStudent,
  deleteCourseFromStudent,
  addAttendanceToStudent,
  deleteAttendanceFromStudent,
  addMarksToStudent,
  deleteMarksFromStudent,
  studentLogin,
} = require("../controllers/studentController");

const router = require("express").Router();

//get all students
router.get("/", getAllStudents);

//get student by roll number
router.get("/roll/:roll_number", getStudentByRollNumber);

//get student by id
router.get("/:id", getStudentById);

//add new student
router.post("/", addNewStudent);

//update student
router.put("/:id", updateStudent);

//delete student
router.delete("/:id", deleteStudent);

//add course to student
router.put("/:id/course", addCourseToStudent);

//delete course from student
router.put("/:id/course/delete", deleteCourseFromStudent);

//add attendance to student
router.put("/:id/attendance", addAttendanceToStudent);

//delete attendance from student
router.put("/:id/attendance/delete", deleteAttendanceFromStudent);

//add marks to student
router.put("/:id/marks", addMarksToStudent);

//delete marks from student
router.put("/:id/marks/delete", deleteMarksFromStudent);

//student login
router.post("/login", studentLogin);

module.exports = router;
