const {
  getAllTeachers,
  getTeacherByStaffId,
  getTeacherById,
  addNewTeacher,
  updateTeacher,
  deleteTeacher,
  getTeachersByDepartment,
  getTeachersByCourse,
} = require("../controllers/teacherController");

const router = require("express").Router();

//get all teachers
router.get("/", getAllTeachers);

//get teacher by staff id
router.get("/staffId/:staffId", getTeacherByStaffId);

//get teacher by id
router.get("/:id", getTeacherById);

//add new teacher
router.post("/", addNewTeacher);

//update teacher
router.put("/:id", updateTeacher);

//delete teacher
router.delete("/:id", deleteTeacher);

//get teachers by department
router.get("/department/:id", getTeachersByDepartment);

//get teachers by course
router.get("/course/:id", getTeachersByCourse);

module.exports = router;
