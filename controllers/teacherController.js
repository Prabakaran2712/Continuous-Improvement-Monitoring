const Teacher = require("../models/Teacher");

//get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({})
      .populate("department")
      .populate("address")
      .populate("course");
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

//add new teacher
const addNewTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(200).json(teacher);
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
