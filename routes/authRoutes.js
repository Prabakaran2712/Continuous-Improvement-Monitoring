const { verifyToken } = require("../controllers/authController");

const router = require("express").Router();

//verify token and send user details
router.post("/verify", verifyToken);

module.exports = router;
