const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// USER ROUTES

// get users
router.get("/", userController.getUsers);

// exported router
module.exports = router;
