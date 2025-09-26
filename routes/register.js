const express = require("express");
const routes = express.Router();
const authController = require("../controller/authentictionController");

routes.use("/", authController);

module.exports = routes;
