const {
  getAllAttendances,
  addNewAttendance,
  deleteAttendance,
  updateAttendance,
  getAttendanceByStudent,
  getAttendanceByClass,
  getAttendancePercentageByStudentForCourse,
  getAttendancePercentageByStudentForAllClasses,
  getAttendancePercentageByClassForAllStudents,
} = require("../controllers/attendanceController");

const router = require("express").Router();

//get all attendances
router.get("/", getAllAttendances);

//add new attendance
router.post("/", addNewAttendance);

//delete attendance
router.delete("/:id", deleteAttendance);

//update attendance
router.put("/:id", updateAttendance);

//attendance by student
router.get("/student/:id", getAttendanceByStudent);

//attendance by class
router.get("/class/:id", getAttendanceByClass);

//attendance percentage by student for course
router.get(
  "/student/:student_id/course/:course_id",
  getAttendancePercentageByStudentForCourse
);

//attendance percentage by student for all classes
router.get(
  "/student/:student_id/all",
  getAttendancePercentageByStudentForAllClasses
);

//attendance percentage by class for all students
router.get(
  "/class/:class_id/all",
  getAttendancePercentageByClassForAllStudents
);

module.exports = router;
