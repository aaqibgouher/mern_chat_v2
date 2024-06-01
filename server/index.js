const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const initializeSocket = require("./socket"); // Import the socket initialization function

// db configuration
require("./database/config");

// models
const models = require("./models");

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// imported routes
const router = require("./routes");

// my routes
app.use("/api/", router);

// Initialize socket
initializeSocket(server); // Call the function to initialize socket

// port
const PORT = process.env.PORT || 3000;

// listening port
server.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
