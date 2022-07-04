const Express = require("express");
const Router = Express.Router();
const restaurantController = require("../Controllers/restaurantControllers");

Router.route("/")
  .get(restaurantController.getAll)
  .post(restaurantController.create);

Router.route("/:id")
  .put(restaurantController.edit)
  .delete(restaurantController.delete)
  .get(restaurantController.getOne);

module.exports = Router;
