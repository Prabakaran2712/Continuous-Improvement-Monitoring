const {
  getTeachesByStaffId,
  getTeachesByCourseId,
  addNewTeaches,
  addStudentsToTeaches,
  removeStudentsFromTeaches,
  deleteTeaches,
  transferTeacher,
} = require("../controllers/teachesController");

const router = require("express").Router();

//get teaches by staff id
router.get("/staff/:staff_id", getTeachesByStaffId);

//get teaches by course id
router.get("/course/:course_id", getTeachesByCourseId);

//add new teaches
router.post("/", addNewTeaches);

//add students to teaches
router.put("/addStudent/:id", addStudentsToTeaches);

//remove students from teaches
router.put("/removeStudent/:id", removeStudentsFromTeaches);

//delete teaches
router.delete("/:id", deleteTeaches);

//transfer the teacher of a course
router.put("/transferTeacher/:id", transferTeacher);

module.exports = router;
