const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

//create new admin
const addNewAdmin = async (req, res) => {
  try {
    const gensalt = bcrypt.genSaltSync(10);
    const hpass = await bcrypt.hashSync(req.body.password, gensalt);
    req.body.password = hpass;
    const newAdmin = await Admin.create(req.body);
    res.status(200).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//check login
const checkLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
    } else {
      const result = await bcrypt.compareSync(
        req.body.password,
        admin.password
      );
      if (!result) {
        res.status(404).json({ message: "Password is not correct" });
      } else {
        res.status(200).json(admin);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addNewAdmin,
  checkLogin,
};
