require("dotenv").config();
const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
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
    const teacher = await Teacher.find({ staff_id: req.params.staff_id })
      .populate("department")
      .populate("address")
      .populate("course");
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
    const teacher = new Teacher(req.body);
    teacher.password = await bcrypt.hash(teacher.password, 10);
    await teacher.save();

    //create token
    const token = createToken(teacher._id);
    res.status(200).json(teacher, token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update teacher
const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      teacher.staff_id = req.body.staff_id;
      teacher.name = req.body.name;
      teacher.department = req.body.department;
      teacher.address = req.body.address;
      teacher.course = req.body.course;
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
    if (!exists) {
      throw new Error("User does not exist");
    } else {
      bcrypt.compare(req.body.password, exists.password).then((result) => {
        if (result) {
          res.status(200).json({ message: "Login successful" });
        } else {
          throw new Error("Invalid Login Credentials");
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherByStaffId,
  getTeacherById,
  addNewTeacher,
  updateTeacher,
  deleteTeacher,
  getTeachersByDepartment,
  getTeachersByCourse,
};
