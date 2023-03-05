const Department = require("../models/Department");

//fetch all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//fetch a department
const getDepartment = async (req, res) => {
  try {
    const department = await Department.find({ dept_code: req.params.id });
    res.status(200).json(department);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//add a department
const addDepartment = async (req, res) => {
  const department = new Department({
    dept_name: req.body.dept_name,
    dept_code: req.body.dept_code,
  });
  try {
    const savedDepartment = await department.save();
    res.status(201).json(savedDepartment);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//update a department
const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findOneAndUpdate(
      { dept_code: req.params.id },
      { dept_name: req.body.dept_name, dept_code: req.body.dept_code }
    );

    res.status(200).json(department);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//delete a department
const deleteDepartment = async (req, res) => {
  try {
    const removedDepartment = await Department.deleteOne({
      dept_code: req.params.id,
    });
    res.status(200).json(removedDepartment);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = {
  getDepartments,
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
