const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const verifyToken = async (req, res) => {
  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "no token Not authorized to access this route",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    if (decoded.userType === "teacher") {
      const userInfo = await Teacher.findById(decoded.userId);
      if (!userInfo) {
        return res.status(401).json({
          success: false,
          message: "Not authorized to access this route",
        });
      }
      return res.status(200).json({
        success: true,
        message: "User is authorized",
        user: userInfo,
        userType: decoded.userType,
      });
    } else if (decoded.userType === "admin") {
      const admin = await Teacher.findById(decoded.userId);
      if (!admin || admin.isadmin === false) {
        return res.status(401).json({
          success: false,
          message: "Not authorized to access this route",
        });
      }
      return res.status(200).json({
        success: true,
        message: "User is authorized",
        user: admin,
        userType: decoded.userType,
      });
    } else if (decoded.userType === "student") {
      const student = await Student.findById(decoded.userId);
      if (!student) {
        return res.status(401).json({
          success: false,
          message: "Not authorized to access this route",
        });
      }
      return res.status(200).json({
        success: true,
        message: "User is authorized",
        user: student,
        userType: decoded.userType,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized to access this route" });
  }
};

module.exports = {
  verifyToken,
};
