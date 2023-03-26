const Course = require("../models/Course");

//get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate("department");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get course by id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("department");
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new course
const addNewCourse = async (req, res) => {
  try {
    await Course.find({
      subject_code: req.body.subject_code,
    }).then((data) => {
      if (data.length > 0) throw new Error("Subject code already exists");
    });
    const course = new Course(req.body);
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      course.name = req.body.name;
      course.department = req.body.department;
      const updatedCourse = await course.save();
      res.status(200).json(updatedCourse);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      await course.remove();
      res.status(200).json({ message: "Course deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get course by subject_code
const getCourseBySubjectCode = async (req, res) => {
  try {
    const course = await Course.find({
      subject_code: req.params.subject_code,
    }).populate("department");
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get course by name
const getCourseByName = async (req, res) => {
  try {
    const course = await Course.find({ name: req.params.name }).populate(
      "department"
    );
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get course by department
const getCourseByDepartment = async (req, res) => {
  try {
    const course = await Course.find({
      department: req.params.department,
    }).populate("department");
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  addNewCourse,
  updateCourse,
  deleteCourse,
  getCourseBySubjectCode,
  getCourseByName,
  getCourseByDepartment,
};
