const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    //1. Check email exsists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    //2. password === confirm password
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Passwords does not match" });
    }

    //3. password.length > 7
    if (req.body.password.length < 7) {
      return res
        .status(400)
        .json({ message: "Password must be at least 7 characters" });
    }

    //4. encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    await User.create(req.body);

    res.status(201).json({ message: "User created" });
  } catch (e) {
    res.status(400).json({ message: "error signup" });
  }
};

exports.login = async (req, res) => {
  try {
    //1. email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Email or password incorrect" });
    }

    //2. password correct
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (compare == false) {
      return res.status(404).json({ message: "Email or password incorrect" });
    }
    //3. login success
    res.status(200).json({ message: "login successful" });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    // 1. find the user from DB
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // 2. oldpassword === hashed password inside db
    let compare = await bcrypt.compare(req.body.oldPassword, user.password);
    if (compare === false) {
      return res.status(400).json({ message: "Wrong password" });
    }
    // 3. newPassword > 7 characters
    if (req.body.newPassword.length < 7) {
      return res.status(400).json({ message: "New password too short" });
    }
    // 4. newPassword === oldpassword
    if (req.body.newPassword === req.body.oldPassword) {
      return res
        .status(400)
        .json({ message: "New password can not be the same as old password" });
    }
    // 5. newPassword === confirm password
    if (req.body.newPassword != req.body.confirmNewPassword) {
      return res.status(400).json({
        message: "New password and confirm new password does not match",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword }
    );

    res.status(200).json({ message: "Password changed" });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};
