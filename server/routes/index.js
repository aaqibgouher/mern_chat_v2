const express = require("express");
const router = express.Router();

// import all routes
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

// auth routes
router.use("/auth", authRoutes);

// user routes
router.use("/users", userRoutes);

// export router
module.exports = router;
