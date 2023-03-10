const Student = require("../models/student");

//get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({})
      .populate("batch")
      .populate("department")
      .populate("address")
      .populate("course")
      .populate("attendance")
      .populate("marks");
    res.status(200).json(students);
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

//add new student
const addNewStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
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

module.exports = {
  getAllStudents,
  getStudentByRollNumber,
  getStudentById,
  addNewStudent,
  updateStudent,
  deleteStudent,
  addCourseToStudent,
  deleteCourseFromStudent,
  addAttendanceToStudent,
  deleteAttendanceFromStudent,
  addMarksToStudent,
  deleteMarksFromStudent,
};
