const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");

// importing all routes here
router.use("/users", userRoutes);

// export router
module.exports = router;
