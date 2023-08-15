const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const emailVerifiedMiddleware = require("../middleware/emailVerifiedMiddleware");

// import all routes
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");


// auth routes
router.use("/auth", authRoutes);

// user routes
router.use("/users", [authMiddleware.isAuthenticate, emailVerifiedMiddleware.isEmailVerified], userRoutes);

// export router
module.exports = router;
