const Express = require("express");
const Router = Express.Router();
const userController = require("../Controllers/userController");

Router.route("/").post(userController.signUp);

Router.route("/edit-password").put(userController.editPassword);

Router.route("/login").post(userController.login);

module.exports = Router;
