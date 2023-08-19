const express = require("express");
const router = express.Router();
const messageController = require("../controller/messageController");

// USER ROUTES

// get logged in user message for solo chat
router.get("/solo", messageController.getSoloMessages);

// get logged in user message for group chat
router.get("/group/:groupId", messageController.getGroupMessages);

// exported router
module.exports = router;
