const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// register
router.get("/register", authController.register);

// exported router
module.exports = router;
