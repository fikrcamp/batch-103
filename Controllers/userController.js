const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createToken(value) {
  const token = await jwt.sign(
    {
      expiresIn: "1h",
      data: value,
    },
    process.env.JWTSECRET
  );

  return token;
}

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

    //5. create a token
    const token = await createToken({ email: req.body.email });

    res.status(201).json({ message: "User created", token });
  } catch (e) {
    console.log(e.message);
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

    //3. create token
    const token = await createToken({ id: user._id, email: user.email });
    //4. login success
    res.status(200).json({ message: "login successful", token });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    // 1. find the user from DB
    const user = await User.findOne({ email: req.user.email });
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
      { email: user.email },
      { password: hashedPassword }
    );

    res.status(200).json({ message: "Password changed" });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "error" });
  }
};

exports.protect = (req, res, next) => {
  try {
    const token = req.headers.authentication;
    //1. token is empty
    if (!token) {
      return res.status(401).message({ message: "You are not logged in" });
    }
    //2. token verify
    jwt.verify(token, process.env.JWTSECRET, function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "Log in session expired" });
      }
      // console.log(decoded.data);
      req.user = decoded.data;
    });

    next();
  } catch (e) {
    return res.status(404).json({ message: "error" });
  }
};

exports.checkUser = (req, res, next) => {
  try {
    const token = req.headers.authentication;
    //1. token is empty
    if (!token) {
      return res.status(401).message({ message: "You are not logged in" });
    }
    //2. token verify
    jwt.verify(token, process.env.JWTSECRET, function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "Log in session expired" });
      }
    });
    res.status(200).json({ message: "Correct User" });
  } catch (e) {
    res.status(404).json({ message: "error" });
  }
};
