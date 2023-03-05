const Batch = require("../models/Batch");

//get all batches
const getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find({}).populate("department");
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new batch
const addNewBatch = async (req, res) => {
  const batch = new Batch(req.body);
  try {
    const newBatch = await batch.save();
    res.status(201).json(newBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete batch
const deleteBatch = async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update batch
const updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (batch) {
      batch.name = req.body.name;
      batch.department = req.body.department;
      const updatedBatch = await batch.save();
      res.status(200).json(updatedBatch);
    } else {
      res.status(404).json({ message: "Batch not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//batch by department
const getBatchByDepartment = async (req, res) => {
  try {
    const batch = await Batch.find({ department: req.params.id }).populate(
      "department"
    );
    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//batch by id
const getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).populate("department");
    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//batch by degree
const getBatchByDegree = async (req, res) => {
  try {
    const batch = await Batch.find({ degree: req.params.degree }).populate(
      "department"
    );
    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//batch by start year
const getBatchByStartYear = async (req, res) => {
  try {
    const batch = await Batch.find({
      startYear: req.params.startYear,
    }).populate("department");
    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//batch by end year
const getBatchByEndYear = async (req, res) => {
  try {
    const batch = await Batch.find({ endYear: req.params.endYear }).populate(
      "department"
    );
    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBatches,
  addNewBatch,
  deleteBatch,
  updateBatch,
  getBatchByDepartment,
  getBatchById,
  getBatchByDegree,
  getBatchByStartYear,
  getBatchByEndYear,
};
