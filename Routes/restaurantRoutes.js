const express = require("express");
const multer = require("multer");
const restaurantController = require("../Controllers/restaurantController");
const userController = require("../Controllers/userController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extention = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extention);
  },
});

const upload = multer({ storage: storage });

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
  .put(restaurantController.edit)
  .delete(restaurantController.delete);

module.exports = router;
