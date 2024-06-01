const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});
const userService = require("./service/userService");

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

// socket
io.on("connection", (socket) => {
  console.log("Socket initialised");

  //   send message
  socket.on("send_message", async (payload) => {
    // call service method, to add message
    const res = await userService.sendMessage(payload);

    // emit received msg to FE
    io.emit("receive_message", res);
  });

  // update chats if message sent/add user to contact
  socket.on("update_chats", async (payload) => {
    console.log("called updated", payload);
  });

  //   disconnect
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

// port
const PORT = process.env.PORT || 3000;

// listening port
server.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
