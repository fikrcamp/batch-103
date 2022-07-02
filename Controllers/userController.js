const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  // 1. check if email is already in use
  try {
    const found = await User.findOne({ email: req.body.email });
    if (found) {
      res.status(401).json({ message: "email already in use" });
    }
    // 2. check if password > 7
    if (req.body.password < 7) {
      res
        .status(401)
        .json({ message: "password should at least be 7 characters" });
    }
    // 3. password === confirm password
    if (req.body.password !== req.body.confirmPassword) {
      res.status(401).json({ message: "paaswords don't match" });
    }
    // 4. encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    // 5. sign up success
    await User.create(req.body);
    res.status(200).json({ message: "user created" });
  } catch (err) {
    res.status(401).json({ message: "error in signUp" });
  }
};

exports.login = async (req, res) => {
  try {
    //1. email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: "email or password is incorrect" });
    }
    //2. password correct
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match === false) {
      res.status(401).json({ message: "email or password is incorrect" });
    }
    //3. login success
    res.status(200).json({ message: `Welcome back, ${user.name}!` });
  } catch (err) {
    res.status(401).json({ message: "error in login" });
  }
};

exports.editUser = (req, res) => {
  try {
    res.status(200).json({ message: "success!" });
  } catch (err) {
    res.status(401).json({ message: "error in edit" });
  }
};
