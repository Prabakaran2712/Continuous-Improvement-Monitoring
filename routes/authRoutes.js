const { verifyToken } = require("../controllers/authController");

const router = require("express").Router();

//verify token and send user details
router.get("/verify", verifyToken);

module.exports = router;
