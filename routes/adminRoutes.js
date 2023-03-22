const { addNewAdmin, checkLogin } = require("../controllers/adminController");

const router = require("express").Router();

//Create new admin
router.post("/", addNewAdmin);

//Login admin
router.post("/login", checkLogin);

module.exports = router;
