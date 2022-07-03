const express = require("express");

const restaurantController = require("../Controllers/restaurantController");

const router = express.Router();

router
  .route("/")
  .get(restaurantController.getAll)
  .post(restaurantController.create);

router
  .route("/:id")
  .get(restaurantController.getOne)
  .put(restaurantController.edit)
  .delete(restaurantController.delete);

module.exports = router;
