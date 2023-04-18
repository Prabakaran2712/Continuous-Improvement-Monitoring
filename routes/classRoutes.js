const {
  getAllClasses,
  getClassById,
  addNewClass,
  deleteClass,
  updateClass,
  getClassesByDepartment,
  getClassesByBatch,
  getClassesByTeacher,
  getClassesByCourse,
  getClassesBetweenDates,
  getClassesByDuration,
  getClassesByTime,
} = require("../controllers/classController");

const router = require("express").Router();

//get all classes
router.get("/", getAllClasses);

//get class by id

router.get("/:id", getClassById);

//add new class
router.post("/", addNewClass);

//delete class
router.delete("/:id", deleteClass);

//update class
router.put("/:id", updateClass);

//get classes by department
router.get("/department/:id", getClassesByDepartment);

//get classes by batch
router.get("/batch/:id", getClassesByBatch);

//get classes by teacher
router.get("/teacher/:id", getClassesByTeacher);

//get classes by course
router.get("/course/:id", getClassesByCourse);

//get classes between dates
router.get("/date/:start_date/:end_date", getClassesBetweenDates);

//get classes by duration
router.get("/duration/:duration", getClassesByDuration);

//get classes by time
router.get("/time/:time", getClassesByTime);

module.exports = router;
