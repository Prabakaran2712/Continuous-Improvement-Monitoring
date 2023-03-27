const Teaches = require("../models/Teaches");

// get Teaches by a staff
const getTeachesByStaffId = async (req, res) => {
  try {
    const teaches = await Teaches.find({ Teacher: req.params.staff_id })
      .populate("teacher")
      .populate("course")
      .populate("students");
    res.status(200).json(teaches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get Teaches by a course
const getTeachesByCourseId = async (req, res) => {
  try {
    const teaches = await Teaches.find({ Course: req.params.course_id })
      .populate("teacher")
      .populate("course")
      .populate("students");
    res.status(200).json(teaches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new Teaches
const addNewTeaches = async (req, res) => {
  const teaches = new Teaches({
    teacher: req.body.teacher,
    course: req.body.course,
  });
  try {
    const newTeaches = await teaches.save();
    res.status(201).json(newTeaches);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//add students to teaches
const addStudentsToTeaches = async (req, res) => {
  try {
    const teaches = await Teaches.findById(req.params.id);
    if (teaches) {
      teaches.students.push(req.body.student);
      const updatedTeaches = await teaches.save();
      res.status(200).json(updatedTeaches);
    } else {
      res.status(404).json({ message: "Teaches not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//remove students from teaches
const removeStudentsFromTeaches = async (req, res) => {
  try {
    const teaches = await Teaches.findById(req.params.id);
    if (teaches) {
      teaches.students = teaches.students.filter(
        (student) => student._id != req.body.student
      );
      const updatedTeaches = await teaches.save();
      res.status(200).json(updatedTeaches);
    } else {
      res.status(404).json({ message: "Teaches not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete teaches
const deleteTeaches = async (req, res) => {
  try {
    const teaches = await Teaches.findById(req.params.id);
    if (teaches) {
      await teaches.remove();
      res.status(200).json({ message: "Teaches deleted" });
    } else {
      res.status(404).json({ message: "Teaches not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// transfer the teacher of a course
const transferTeacher = async (req, res) => {
  try {
    const teaches = await Teaches.findById(req.params.id);
    if (teaches) {
      teaches.teacher = req.body.teacher;
      const updatedTeaches = await teaches.save();
      res.status(200).json(updatedTeaches);
    } else {
      res.status(404).json({ message: "Teaches not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeachesByStaffId,
  getTeachesByCourseId,
  addNewTeaches,
  addStudentsToTeaches,
  removeStudentsFromTeaches,
  deleteTeaches,
  transferTeacher,
};
