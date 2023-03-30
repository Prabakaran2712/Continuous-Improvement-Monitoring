const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const verifyToken = async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await Student.findById(decoded._id);

    if (user) {
      res.status(200).json({ user: user, token: token, userType: "student" });
    } else {
      const teacher = await Teacher.findById(decoded._id);
      if (teacher) {
        res
          .status(200)
          .json({ user: teacher, token: token, userType: "teacher" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  verifyToken,
};
