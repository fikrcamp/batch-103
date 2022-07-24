const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();

router.route("/").post(userController.signUp);
router.route("/login").post(userController.login);
router
  .route("/changePassword")
  .put(userController.protect, userController.changePassword);

router.route("/check").get(userController.checkUser);
module.exports = router;
