const {
  getAllAddresses,
  addNewAddress,
  deleteAddress,
  updateAddress,
} = require("../controllers/addressController");

const router = require("express").Router();

//get all addresses
router.get("/", getAllAddresses);

//add new address
router.post("/", addNewAddress);

//delete address
router.delete("/:id", deleteAddress);

//update address
router.put("/:id", updateAddress);

module.exports = router;
