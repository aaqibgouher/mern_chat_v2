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

// create group
router.post("/create-group", userController.createGroup);

// add participant to group
router.post("/add-member-to-group", userController.addMemberToGroup);

// exported router
module.exports = router;
