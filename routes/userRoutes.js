const express = require("express");
const { test, getUsers } = require("../controllers/userControllers");

const Router = express.Router();

// Define routes

Router.get("/test", test);

Router.get("/getUsers", getUsers)


module.exports = Router
