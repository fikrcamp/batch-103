const Menu = require("../Models/menuModel");
const Restaurant = require("../Models/restaurantModel");

exports.getAll = async (req, res) => {
  try {
    const usersRestaurant = await Restaurant.findOne({ user: req.user.id });

    const items = await Menu.find({ restaurant: usersRestaurant._id });
    res.status(200).json({ message: "found", items: items });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.status(200).json({ message: "found", menu });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "error" });
  }
};

exports.create = async (req, res) => {
  try {
    const found = await Restaurant.findOne({ user: req.user.id });

    req.body.image = req.file.filename;
    req.body.restaurant = found._id;

    await Menu.create(req.body);
    res.status(201).json({ message: "created menu item" });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "error" });
  }
};

exports.edit = async (req, res) => {
  try {
    await Menu.findByIdAndUpdate(req.params.id, req.body);
    console.log(req.body);
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
