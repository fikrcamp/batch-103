const Restaurant = require("../Models/restaurantModel");

exports.getAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json({ restaurants });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "error" });
  }
};

exports.create = async (req, res) => {
  try {
    await Restaurant.create(req.body);
    res.status(200).json({ message: "Restaurant created" });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "error" });
  }
};

exports.edit = async (req, res) => {
  try {
    await Restaurant.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Restaurant edited" });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "error" });
  }
};

exports.delete = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Restaurant deleted" });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params.id });
    res.status(200).json({ restaurant });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "error" });
  }
};
