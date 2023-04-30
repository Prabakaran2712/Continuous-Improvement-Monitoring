const {
  addMoreGrades,
  getGradeByTeaches,
} = require("../controllers/gradeController");

const router = require("express").Router();

//add more grades
router.post("/grades", addMoreGrades);

//get grade by teaches
router.get("/teaches/:id", getGradeByTeaches);

module.exports = router;
