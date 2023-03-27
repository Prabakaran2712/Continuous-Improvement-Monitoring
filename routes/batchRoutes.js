const {
  getAllBatches,
  addNewBatch,
  deleteBatch,
  updateBatch,
  getBatchById,
  getBatchByDegree,
  getBatchByStartYear,
  getBatchByEndYear,
} = require("../controllers/batchController");

const router = require("express").Router();

//get all batches
router.get("/", getAllBatches);

//add new batch
router.post("/", addNewBatch);

//delete batch
router.delete("/:id", deleteBatch);

//update batch
router.put("/:id", updateBatch);

//batch by id
router.get("/:id", getBatchById);

//batch by degree
router.get("/degree/:degree", getBatchByDegree);

//batch by start year
router.get("/startYear/:startYear", getBatchByStartYear);

//batch by end year
router.get("/endYear/:endYear", getBatchByEndYear);

module.exports = router;
