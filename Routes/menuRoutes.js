const express = require("express");

const menuController = require("../Controllers/menuController");
const userController = require("../Controllers/userController");
const router = express.Router();
const { upload } = require("../Utils/multer");

router
  .route("/")
  .post(userController.protect, upload.single("image"), menuController.create)
  .get(userController.protect, menuController.getAll);

router.route("/:id").put(menuController.edit).delete(menuController.delete);

module.exports = router;
