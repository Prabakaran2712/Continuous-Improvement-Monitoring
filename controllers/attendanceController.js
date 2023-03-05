const Attendance = require("../models/Attendance");

//get all attendances
const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find({})
      .populate("student")
      .populate("class");
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new attendance
const addNewAttendance = async (req, res) => {
  const attendance = new Attendance(req.body);
  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete attendance
const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update attendance
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (attendance) {
      attendance.student = req.body.student;
      attendance.present = req.body.present;
      attendance.class = req.body.class;
      const updatedAttendance = await attendance.save();
      res.status(200).json(updatedAttendance);
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//attendance by student
const getAttendanceByStudent = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.id })
      .populate("student")
      .populate("class");
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//attendance by class
const getAttendanceByClass = async (req, res) => {
  try {
    const attendance = await Attendance.find({ class: req.params.id })
      .populate("student")
      .populate("class");
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//attendance percentage by student for course
const getAttendancePercentageByStudentForCourse = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      student: req.params.student_id,
      course: req.params.course_id,
    })
      .populate("student")
      .populate("class");
    const total_classes = attendance.length;
    const present_classes = attendance.filter(
      (item) => item.present === true
    ).length;
    const percentage = (present_classes / total_classes) * 100;
    res.status(200).json({ percentage: percentage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//total attendance percentage by student for all classes
const getAttendancePercentageByStudentForAllClasses = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.student_id })
      .populate("student")
      .populate("class");
    const total_classes = attendance.length;
    const present_classes = attendance.filter(
      (item) => item.present === true
    ).length;
    const percentage = (present_classes / total_classes) * 100;
    res.status(200).json({ percentage: percentage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//total attendance percentage by class for all students
const getAttendancePercentageByClassForAllStudents = async (req, res) => {
  try {
    const attendance = await Attendance.find({ class: req.params.class_id })
      .populate("student")
      .populate("class");
    const total_classes = attendance.length;
    const present_classes = attendance.filter(
      (item) => item.present === true
    ).length;
    const percentage = (present_classes / total_classes) * 100;
    res.status(200).json({ percentage: percentage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAttendances,
  addNewAttendance,
  deleteAttendance,
  updateAttendance,
  getAttendanceByStudent,
  getAttendanceByClass,
  getAttendancePercentageByStudentForCourse,
  getAttendancePercentageByStudentForAllClasses,
  getAttendancePercentageByClassForAllStudents,
};
