const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

// register
router.post("/register", authController.register);

// email verfication (authenticated)
router.post(
  "/verify-email",
  authMiddleware.isAuthenticate,
  authController.emailVerify
);

// login
router.post("/login", authController.login);

// logout
router.post("/logout", authMiddleware.isAuthenticate, authController.logout);

// exported router
module.exports = router;
