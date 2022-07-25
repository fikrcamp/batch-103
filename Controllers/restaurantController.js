const Restaurant = require("../Models/restaurantModel");
const Menu = require("../Models/menuModel");
exports.getOne = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    const menu = await Menu.find({ restaurant: restaurant._id });
    res.status(200).json({ restaurant, menu });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json({
      results: restaurants.length,
      restaurants: restaurants,
    });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.create = async (req, res) => {
  try {
    req.body.image = req.file.filename;
    req.body.user = req.user.id;
    await Restaurant.create(req.body);
    res.status(200).json({ message: "created" });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.edit = async (req, res) => {
  try {
    await Restaurant.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "updated" });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.delete = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};
