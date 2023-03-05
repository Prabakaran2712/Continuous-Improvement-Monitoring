const {
  getDepartments,
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const router = require("express").Router();

router.get("/", getDepartments);

router.get("/:id", getDepartment);

router.post("/", addDepartment);

router.put("/:id", updateDepartment);

router.delete("/:id", deleteDepartment);

module.exports = router;
