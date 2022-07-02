const { default: mongoose } = require("mongoose");
const mngoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
});

module.exports = userModel = mongoose.model("user", userSchema);
