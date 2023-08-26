const mongoose = require("mongoose");

const deletedSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    deletedAt: {
      type: Date,
      default: "",
    },
  },
  { timestamps: true }
);

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
    deletedFrom: {
      type: [deletedSchema],
      default: [], // Set the default value to an empty array
    },
    deleteFromEveryone: {
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
