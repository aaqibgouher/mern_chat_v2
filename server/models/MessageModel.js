const mongoose = require("mongoose");

// message schema
const messageSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["text", "image", "video", "audio", "doc"],
      default: "text",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// model
const MessageModel = mongoose.model("MessageModel", messageSchema, "messages");

// exporting model
module.exports = MessageModel;
