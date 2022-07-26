const express = require("express");

const router = express.Router();
const orderController = require("../Controllers/orderController");
const userController = require("../Controllers/userController");

router
  .route("/")
  .post(orderController.save)
  .get(userController.protect, orderController.getOrders);

router.route("/:id").delete(orderController.deleteOrder);
module.exports = router;
