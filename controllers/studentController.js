const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "14 days" });
};

//student registration
const addNewStudent = async (req, res) => {
  try {
    //check if roll number already exists
    const rno = await Student.findOne({ roll_number: req.body.roll_number });
    //check if email already exists
    const email = await Student.findOne({ email: req.body.email });

    if (rno) {
      throw new Error("A student with this roll number already exists");
    } else if (email) {
      throw new Error("A student with this email already exists");
    } else {
      const gensalt = bcrypt.genSaltSync(10);
      delete req.body.cpassword;
      const hpass = await bcrypt.hashSync(req.body.password, gensalt);
      req.body.password = hpass;
      const newUser = await Student.create(req.body);

      res.cookie(
        "token",
        createToken({ userId: newUser._id, userType: "student" }),
        {
          maxAge: 1000 * 60 * 60 * 24 * 14,
          httpOnly: true,
          sameSite: "strict",
        }
      );
      res.status(200).json({ newUser, message: "Student added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({})
      .populate("batch")
      .populate("department");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get student by batch
const getStudentByBatch = async (req, res) => {
  try {
    const student = await Student.find({ batch: req.params.batch_id })
      .populate("batch")
      .populate("department");
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get student by roll number
const getStudentByRollNumber = async (req, res) => {
  try {
    const student = await (
      await Student.find({ roll_number: req.params.roll_number }).populate(
        "batch"
      )
    )
      .populate("department")
      .populate("address")
      .populate("course")
      .populate("attendance")
      .populate("marks");
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get student by id
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("batch")
      .populate("department");

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.name = req.body.name;
      student.roll_number = req.body.roll_number;
      student.batch = req.body.batch;
      student.department = req.body.department;
      student.address = req.body.address;
      student.courses = req.body.courses;
      student.attendance = req.body.attendance;
      student.marks = req.body.marks;
      const updatedStudent = await student.save();
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete student
const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add course to student
const addCourseToStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.courses.push(req.body.course);
      const updatedStudent = await student.save();
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete course from student
const deleteCourseFromStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.courses.pull(req.body.course);
      const updatedStudent = await student.save();
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add attendance to student
const addAttendanceToStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.attendance.push(req.body.attendance);
      const updatedStudent = await student.save();
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete attendance from student
const deleteAttendanceFromStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.attendance.pull(req.body.attendance);
      const updatedStudent = await student.save();
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add marks to student
const addMarksToStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.marks.push(req.body.marks);
      const updatedStudent = await student.save();
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete marks from student
const deleteMarksFromStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.marks.pull(req.body.marks);
      const updatedStudent = await student.save();
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// student login
const studentLogin = async (req, res) => {
  try {
    const exists = await Student.findOne({ email: req.body.email });
    if (!exists) {
      throw new Error("User does not exist");
    } else {
      bcrypt
        .compare(req.body.password, exists.password)
        .then((result) => {
          if (result) {
            res.cookie(
              "token",
              createToken({ userId: exists._id, userType: "student" }),
              {
                maxAge: 1000 * 60 * 60 * 24 * 14,
                httpOnly: true,
                sameSite: "strict",
              }
            );
            exists.password = undefined;

            res
              .status(200)
              .json({ success: true, user: exists, userType: "student" });
          } else {
            throw new Error("Invalid Login Credentials");
          }
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//verify token and send user details
const verifyToken = async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await Student.findById(decoded._id);

    if (user) {
      res.status(200).json({ user: user, token: token });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  getAllStudents,
  getStudentByRollNumber,
  getStudentById,
  getStudentByBatch,
  addNewStudent,
  updateStudent,
  deleteStudent,
  addCourseToStudent,
  deleteCourseFromStudent,
  addAttendanceToStudent,
  deleteAttendanceFromStudent,
  addMarksToStudent,
  deleteMarksFromStudent,
  studentLogin,
  verifyToken,
  logout,
};
