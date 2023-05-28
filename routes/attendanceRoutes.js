const {
  getAllAttendances,
  addNewAttendance,
  addMoreAttendances,
  deleteAttendance,
  updateAttendance,
  getAttendanceByStudent,
  getAttendanceByClass,
  getAttendancePercentageByStudentForCourse,
  getAttendancePercentageByStudentForAllClasses,
  getAttendancePercentageByClassForAllStudents,
  getAttendancePercentageByStudentForAllCourses,
  getAttendanceByStudentAndTeaches,
  getAttendancePercentageByTeaches,
} = require("../controllers/attendanceController");

const router = require("express").Router();

//get all attendances
router.get("/", getAllAttendances);

//add new attendance
router.post("/", addNewAttendance);

//add more attendances
router.post("/add", addMoreAttendances);

//delete attendance
router.delete("/:id", deleteAttendance);

//update attendance
router.put("/:id", updateAttendance);

//attendance by student
router.get("/student/:id", getAttendanceByStudent);

//attendance by class
router.get("/class/:id", getAttendanceByClass);

//get attendance percentage  for teaches
router.get("/teaches/:id", getAttendancePercentageByTeaches);

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

//attendance percentage by student for all courses
router.get(
  "/student/:student_id/all/courses",
  getAttendancePercentageByStudentForAllCourses
);

//get attedances by student and teaches
router.get(
  "/student/:student_id/teaches/:teaches_id",
  getAttendanceByStudentAndTeaches
);

module.exports = router;
