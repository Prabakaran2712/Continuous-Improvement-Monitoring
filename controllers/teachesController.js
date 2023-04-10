const Teaches = require("../models/Teaches");

//get all Teaches
const getAllTeaches = async (req, res) => {
  try {
    const teaches = await Teaches.find()
      .populate({
        path: "teacher",
        populate: { path: "department address" },
      })
      .populate({
        path: "course",
        populate: { path: "department" },
      })
      .populate({
        path: "students",
        populate: { path: "department batch" },
      })
      .populate("batch");
    res.status(200).json(teaches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get Teaches by id
const getTeachesById = async (req, res) => {
  try {
    const teaches = await Teaches.findById(req.params.id)
      .populate({
        path: "teacher",
        populate: { path: "department address" },
      })
      .populate({
        path: "course",
        populate: { path: "department" },
      })
      .populate({
        path: "students",
        populate: { path: "department batch" },
      })
      .populate("batch");
    res.status(200).json(teaches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get Teaches by a staff
const getTeachesByStaffId = async (req, res) => {
  try {
    const teaches = await Teaches.find({ teacher: req.params.staff_id })
      .populate({
        path: "teacher",
        populate: { path: "department address" },
      })
      .populate({
        path: "course",
        populate: { path: "department" },
      })
      .populate({
        path: "students",
        populate: { path: "department batch" },
      })
      .populate("batch");

    res.status(200).json(teaches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get Teaches by a course
const getTeachesByCourseId = async (req, res) => {
  try {
    const teaches = await Teaches.find({ Course: req.params.course_id })
      .populate({
        path: "teacher",
        populate: { path: "department address" },
      })
      .populate({
        path: "course",
        populate: { path: "department" },
      })
      .populate({
        path: "students",
        populate: { path: "department batch" },
      })
      .populate("batch");
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
    batch: req.body.batch,
    semester: req.body.semester,
  });
  try {
    const newTeaches = await teaches.save();
    res.status(201).json(newTeaches);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all teaches having a particular student in student array

const getTeachesByStudentId = async (req, res) => {
  try {
    const teaches = await Teaches.find({ students: req.params.student_id })
      .populate({
        path: "teacher",
        populate: { path: "department address" },
      })
      .populate({
        path: "course",
        populate: { path: "department" },
      })
      .populate({
        path: "students",
        populate: { path: "department batch" },
      })
      .populate("batch");
    res.status(200).json(teaches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add students to teaches
const addStudentsToTeaches = async (req, res) => {
  try {
    const teaches = await Teaches.findById(req.params.id);
    if (teaches) {
      if (teaches.students.includes(req.body.student)) {
        throw new Error("Student already exists");
      }
      teaches.students.push(req.body.student);
      const updatedTeaches = await teaches.save();
      const updatedTeachesPopulated = await Teaches.findById(updatedTeaches._id)
        .populate({
          path: "teacher",
          populate: { path: "department address" },
        })
        .populate({
          path: "course",
          populate: { path: "department" },
        })
        .populate({
          path: "students",
          populate: { path: "department batch" },
        })
        .populate("batch");
      res.status(200).json(updatedTeachesPopulated);
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
      const updatedTeachesPopulated = await Teaches.findById(updatedTeaches._id)
        .populate({
          path: "teacher",
          populate: { path: "department address" },
        })
        .populate({
          path: "course",
          populate: { path: "department" },
        })
        .populate({
          path: "students",
          populate: { path: "department batch" },
        })
        .populate("batch");
      res.status(200).json(updatedTeachesPopulated);
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
  getAllTeaches,
  getTeachesByStaffId,
  getTeachesById,
  getTeachesByCourseId,
  getTeachesByStudentId,
  addNewTeaches,
  addStudentsToTeaches,
  removeStudentsFromTeaches,
  deleteTeaches,
  transferTeacher,
};
