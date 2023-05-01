const {
  addMoreGrades,
  getGradeByTeaches,
  getGradeByStudent,
} = require("../controllers/gradeController");

const router = require("express").Router();

//add more grades
router.post("/grades", addMoreGrades);

//get grade by teaches
router.get("/teaches/:id", getGradeByTeaches);

//get grade by student
router.get("/student/:id", getGradeByStudent);

module.exports = router;
