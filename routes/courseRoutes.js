const {
  getAllCourses,
  getCourseById,
  addNewCourse,
  updateCourse,
  deleteCourse,
  getCourseBySubjectCode,
  getCourseByName,
  getCourseByDepartment,
} = require("../controllers/courseController");

const router = require("express").Router();

//get all courses
router.get("/", getAllCourses);

//get course by id
router.get("/:id", getCourseById);

//add new course
router.post("/", addNewCourse);

//update course
router.put("/:id", updateCourse);

//delete course
router.delete("/:id", deleteCourse);

//get course by subject code
router.get("/subjectCode/:subjectCode", getCourseBySubjectCode);

//get course by name
router.get("/name/:name", getCourseByName);

//get course by department
router.get("/department/:id", getCourseByDepartment);

module.exports = router;
