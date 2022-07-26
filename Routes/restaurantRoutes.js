const express = require("express");
const multer = require("multer");
const restaurantController = require("../Controllers/restaurantController");
const userController = require("../Controllers/userController");
const { upload } = require("../Utils/multer");

const router = express.Router();

router
  .route("/user")
  .get(userController.protect, restaurantController.getUsersRestaurant);

router
  .route("/")
  .get(restaurantController.getAll)
  .post(
    userController.protect,
    upload.single("image"),
    restaurantController.create
  );

router
  .route("/:id")
  .get(restaurantController.getOne)
  .put(upload.single("image"), restaurantController.edit)
  .delete(restaurantController.delete);

module.exports = router;
