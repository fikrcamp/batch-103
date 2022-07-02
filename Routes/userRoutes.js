const Express = require("express");
const Router = Express.Router();
const userController = require("../Controllers/userController");

Router.route("/").post(userController.signUp).put(userController.editUser);

Router.route("/login").post(userController.login);

module.exports = Router;
