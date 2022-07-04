const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  // 1. check if email is already in use
  try {
    const found = await User.findOne({ email: req.body.email });
    if (found) {
      return res.status(401).json({ message: "email already in use" });
    }
    // 2. check if password > 7
    if (req.body.password < 7) {
      return res
        .status(401)
        .json({ message: "password should at least be 7 characters" });
    }
    // 3. password === confirm password
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).json({ message: "paaswords don't match" });
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
    const found = await User.findOne({ email: req.body.email });
    if (!found) {
      return res
        .status(401)
        .json({ message: "email or password is incorrect" });
    }
    //2. password correct
    const match = await bcrypt.compare(req.body.password, found.password);
    if (match === false) {
      return res
        .status(401)
        .json({ message: "email or password is incorrect" });
    }
    //3. login success
    res.status(200).json({ message: `Welcome back, ${found.name}!` });
  } catch (err) {
    res.status(401).json({ message: "error in login" });
  }
};

exports.editPassword = async (req, res) => {
  try {
    //1. find the user from DB
    const found = await User.findById({ _id: req.query.id });
    //2. oldpassword === hashed password inside db
    const match = await bcrypt.compare(
      req.body.currentPassword,
      found.password
    );
    if (match === false) {
      return res.status(401).json({ message: "Incorrect current password" });
    }
    //3. newPassword > 7 characters
    if (req.body.newPassword < 7) {
      return res
        .status(401)
        .json({ message: "New password must be at least 7 characters" });
    }

    //6. newPassword === confirm password'
    if (req.body.newPassword !== req.body.confirmNewPassword) {
      return res.status(401).json({ message: "Passwords doesn't match" });
    }

    //5. newPassword !== oldpassword
    const isMatch = await bcrypt.compare(req.body.newPassword, found.password);
    if (isMatch) {
      return res.status(401).json({
        message: "New password cannot be the same as current password",
      });
    }

    //6. encrypt newPassword & save new password to the DB
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
    // req.body.password = hashedPassword;
    await User.findByIdAndUpdate(
      { _id: req.query.id },
      { password: hashedNewPassword }
    );
    //7. password edit success
    res.status(200).json({ message: "Password changed" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "error in edit" });
  }
};
