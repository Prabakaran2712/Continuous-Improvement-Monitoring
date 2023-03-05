const Address = require("../models/Address");

//get all addresses
const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({});
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new address
const addNewAddress = async (req, res) => {
  const address = new Address(req.body);
  try {
    const newAddress = await address.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete address
const deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update address
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (address) {
      address.city = req.body.city;
      address.state = req.body.state;
      address.country = req.body.country;
      address.pincode = req.body.pincode;
      address.address_line_1 = req.body.address_line_1;
      address.address_line_2 = req.body.address_line_2;
      const updatedAddress = await address.save();
      res.status(200).json(updatedAddress);
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAddresses,
  addNewAddress,
  deleteAddress,
  updateAddress,
};
