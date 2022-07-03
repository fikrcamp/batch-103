const Restaurant = require("../Models/restaurantModel");

exports.getOne = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json({ restaurant });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json({
      results: restaurants.length,
      data: restaurants,
    });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.create = async (req, res) => {
  try {
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
