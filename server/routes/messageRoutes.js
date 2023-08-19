const express = require("express");
const router = express.Router();
const messageController = require("../controller/messageController");

// USER ROUTES

// get logged in user detail
router.get("/", messageController.getMessages);

// exported router
module.exports = router;
