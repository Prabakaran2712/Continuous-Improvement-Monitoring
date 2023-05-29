const Teacher = require("../models/Teacher");
const Address = require("../models/Address");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "14 days" });
};

//verfiy token
const verifyLogin = async (req, res) => {
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
      if (!admin) {
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

//get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({})
      .populate("department")
      .populate("address")
      .populate({ path: "courses" });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get teacher by staff_id
const getTeacherByStaffId = async (req, res) => {
  try {
    const teachers = await Teacher.findOne({ staff_id: req.params.staffId })
      .populate("department")
      .populate("address")
      .populate({ path: "courses" });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get teacher by id
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("department")
      .populate("address")
      .populate("course");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new teacher and hash password using bcrypt
const addNewTeacher = async (req, res) => {
  try {
    const address = await Address({
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pincode: req.body.pincode,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
    });
    address.save();
    console.log(address);
    delete req.body.city;
    delete req.body.state;
    delete req.body.country;
    delete req.body.pincode;
    delete req.body.address_line_1;
    delete req.body.address_line_2;
    delete req.body.cpassword;
    req.body.address = address._id;
    const teacher = new Teacher(req.body);
    teacher.password = await bcrypt.hash(req.body.password, 10).then((data) => {
      return data;
    });
    console.log(teacher);

    await teacher.save();

    //create token
    res.cookie(
      "token",
      createToken({ userId: teacher._id, userType: "teacher" }),
      {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: "strict",
      }
    );
    res.status(200).json({ teacher, message: "Teacher added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update teacher
const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ staff_id: req.params.id });
    if (teacher) {
      teacher.staff_id = req.body.staff_id;
      teacher.name = req.body.name;
      teacher.phone_number = req.body.phone_number;
      teacher.department = req.body.department;
      // teacher.address = req.body.address;
      teacher.courses = req.body.courses;
      if (req.body.password) {
        teacher.password = await bcrypt
          .hash(req.body.password, 10)
          .then((data) => {
            return data;
          });
      } else {
        teacher.password = teacher.password;
      }
      const updatedTeacher = await teacher.save();
      res.status(200).json(updatedTeacher);
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      await teacher.remove();
      res.status(200).json({ message: "Teacher deleted" });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get teachers by department
const getTeachersByDepartment = async (req, res) => {
  try {
    const teachers = await Teacher.find({ department: req.params.id })
      .populate("department")
      .populate("address")
      .populate("course");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get teachers by course
const getTeachersByCourse = async (req, res) => {
  try {
    const teachers = await Teacher.find({
      courses: { $elemMatch: { _id: req.params.id } },
    })
      .populate("department")
      .populate("address")
      .populate("course");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login teacher
const loginTeacher = async (req, res) => {
  try {
    const exists = await Teacher.findOne({ email: req.body.email });
    var userType = "teacher";

    if (!exists) {
      throw new Error("User does not exist");
    } else {
      bcrypt.compare(req.body.password, exists.password).then((result) => {
        if (result) {
          //check if user is admin
          if (exists.isadmin) {
            userType = "admin";
            res.cookie(
              "token",
              createToken({ userId: exists._id, userType: "admin" }),
              {
                maxAge: 1000 * 60 * 60 * 24 * 14,
                httpOnly: true,
                sameSite: "strict",
              }
            );

            exists.password = undefined;

            res
              .status(200)
              .json({ success: true, user: exists, userType: userType });
          } else {
            userType = "teacher";
            res.cookie(
              "token",
              createToken({ userId: exists._id, userType: "teacher" }),
              {
                maxAge: 1000 * 60 * 60 * 24 * 14,
                httpOnly: true,
                sameSite: "strict",
              }
            );
            exists.password = undefined;

            res
              .status(200)
              .json({ success: true, user: exists, userType: userType });
          }
        } else {
          try {
            throw new Error("Invalid Login Credentials");
          } catch (error) {
            res.status(401).json({
              success: false,
              message: error.message,
            });
          }
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  console.log("logout");
  try {
    console.log("logout");
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  verifyLogin,
  getAllTeachers,
  getTeacherByStaffId,
  getTeacherById,
  addNewTeacher,
  updateTeacher,
  deleteTeacher,
  getTeachersByDepartment,
  getTeachersByCourse,
  loginTeacher,
  logout,
};
