const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// USER ROUTES

// get logged in user detail
router.get("/me", userController.getUser);

// get users for add user
router.get("/search", userController.getSearchUsers);

// get added users
router.get("/connected", userController.getConnectedUsers);

// exported router
module.exports = router;
