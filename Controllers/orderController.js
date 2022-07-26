const Order = require("../Models/orderModel");
const Restaurant = require("../Models/restaurantModel");
exports.save = async (req, res) => {
  try {
    // console.log(req.body);
    await Order.create(req.body);
    res.status(201).json({ message: "ordered" });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const find = await Restaurant.findOne({ user: req.user.id });
    const order = await Order.find({ restaurant: find._id });

    res.status(200).json({ message: "found", order });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};
