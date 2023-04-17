const Class = require("../models/Class");

//get all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({})
      .populate("department")
      .populate("batch")
      .populate("course")
      .populate("teacher");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new class
const addNewClass = async (req, res) => {
  const classs = new Class(req.body);
  try {
    const newClass = await classs.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete class
const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update class
const updateClass = async (req, res) => {
  try {
    const classs = await Class.findById(req.params.id);
    if (classs) {
      classs.name = req.body.name;
      classs.department = req.body.department;
      const updatedClass = await classs.save();
      res.status(200).json(updatedClass);
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get classes by department
const getClassesByDepartment = async (req, res) => {
  try {
    const classes = await Class.find({ d: req.params.id }).populate(
      "department"
    );
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get classes by batch
const getClassesByBatch = async (req, res) => {
  try {
    const classes = await Class.find({ batch: req.params.id }).populate(
      "batch"
    );
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get classes by teacher
const getClassesByTeacher = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate({
        path: "teaches",
        populate: { path: "course", populate: { path: "department" } },
      })
      .populate({
        path: "teaches",

        populate: {
          path: "teacher",
          populate: { path: "department address" },
          match: { _id: req.params.id },
        },
      })
      .populate({
        path: "teaches",
        populate: { path: "students", populate: { path: "department batch" } },
      })
      .populate({ path: "teaches", populate: { path: "batch" } });

    //remove values that have teacher null
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].teaches.teacher == null) {
        classes.splice(i, 1);
        i--;
      }
      res.status(200).json(classes);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get classes by course
const getClassesByCourse = async (req, res) => {
  try {
    const classes = await Class.find({ course: req.params.id }).populate(
      "course"
    );
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get classes between  two dates
const getClassesBetweenDates = async (req, res) => {
  try {
    const classes = await Class.find({
      date: { $gte: req.params.start, $lte: req.params.end },
    }).populate("date");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get classes by duration
const getClassesByDuration = async (req, res) => {
  try {
    const classes = await Class.find({
      duration: req.params.duration,
    }).populate("duration");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get classes by time
const getClassesByTime = async (req, res) => {
  try {
    const classes = await Class.find({
      time: req.params.time,
    }).populate("time");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllClasses,
  addNewClass,
  deleteClass,
  updateClass,
  getClassesByDepartment,
  getClassesByBatch,
  getClassesByTeacher,
  getClassesByCourse,
  getClassesBetweenDates,
  getClassesByDuration,
  getClassesByTime,
};
