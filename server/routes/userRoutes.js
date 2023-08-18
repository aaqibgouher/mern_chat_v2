const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// USER ROUTES

// get users
router.get("/", userController.getUsers);

// get logged in user detail
router.get("/me", userController.getUser);

// get users for add user
router.get("/search", userController.getSearchUsers);

// exported router
module.exports = router;
