const Menu = require("../Models/menuModel");

exports.create = async (req, res) => {
  try {
    await Menu.create(req.body);
    res.status(201).json({ message: "created menu item" });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.edit = async (req, res) => {
  try {
    await Menu.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "edited menu item" });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.delete = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "delete menu item" });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};
