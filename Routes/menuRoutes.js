const express = require("express");

const menuController = require("../Controllers/menuController");
const userController = require("../Controllers/userController");
const router = express.Router();
const { upload } = require("../Utils/multer");

router
  .route("/")
  .post(userController.protect, upload.single("image"), menuController.create)
  .get(userController.protect, menuController.getAll);

router
  .route("/:id")
  .get(menuController.getOne)
  .put(upload.single("image"), menuController.edit)
  .delete(menuController.delete);

module.exports = router;
