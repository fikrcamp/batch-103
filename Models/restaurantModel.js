const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    requires: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = restaurantModel = mongoose.model(
  "Restaurant",
  restaurantSchema
);
