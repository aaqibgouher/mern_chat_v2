const mongoose = require("mongoose");

// Seen Schema
const seenSchema = new mongoose.Schema(
  {
    seenById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { timestamps: true }
);

// group schema
const groupMessageSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    toGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupModel",
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
    seen: [seenSchema],
    isDeleted: {
      type: String,
      enum: ["ME", "EVERYONE", "NOT_DELETED"],
      default: "NOT_DELETED",
    },
  },
  { timestamps: true }
);

// model
const GroupMessageModel = mongoose.model(
  "GroupMessageModel",
  groupMessageSchema,
  "group_messages"
);

// exporting model
module.exports = GroupMessageModel;
