// socket.js
const { Server } = require("socket.io");
const userService = require("./service/userService");
const { isAuthenticateSocket } = require("./middleware/authMiddleware");
const { convertToMongoObjectId } = require("./utils/Common");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
    },
  });

  // Apply socket middleware
  io.use((socket, next) => isAuthenticateSocket(socket, next));

  io.on("connection", (socket) => {
    console.log("Socket initialised", socket.user);

    // send message
    socket.on("send_message", async (payload, callback) => {
      try {
        // call service method to add message
        const res = await userService.sendMessage(payload);

        // emit received msg to FE
        io.emit("receive_message", res);

        // Call the callback to acknowledge the message
        callback("Message received by server");
      } catch (error) {
        console.log(error, "Error in sending message");
        // Send an error acknowledgment to the client
        callback({ error: "Error in sending message" });
      }
    });

    // update chats if message sent/add user to contact
    socket.on("update_chats", async (payload) => {
      console.log("called updated", socket.user._id, "######");
      const { type, search } = payload;
      try {
        let data = await userService.getConnectedUsers({
          type,
          search,
          userId: socket.user._id,
        });
        console.log(4, "chats ##########");
      } catch (error) {
        console.log(error, "Socket: update chats event");
      }
    });
  });
};

module.exports = initializeSocket;
