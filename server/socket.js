// socket.js
const { Server } = require("socket.io");
const userService = require("./service/userService");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket initialised");

    // send message
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

    // disconnect
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  });
};

module.exports = initializeSocket;
