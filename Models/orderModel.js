const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  payment: String,
  cart: [Object],
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
  },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
