const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const emailVerifiedMiddleware = require("../middleware/emailVerifiedMiddleware");

// import all routes
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const messageRoutes = require("./messageRoutes");

// auth routes
router.use("/auth", authRoutes);

// user routes
router.use(
  "/users",
  [authMiddleware.isAuthenticate, emailVerifiedMiddleware.isEmailVerified],
  userRoutes
);

// message routes
router.use(
  "/messages",
  [authMiddleware.isAuthenticate, emailVerifiedMiddleware.isEmailVerified],
  messageRoutes
);

// export router
module.exports = router;
