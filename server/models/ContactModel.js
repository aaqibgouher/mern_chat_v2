const mongoose = require("mongoose");

// latest message schema
const latestMessageSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

// contact token schema
const contactSchema = new mongoose.Schema(
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
    isGroup: {
      type: Boolean,
      default: false,
    },
    latestMessage: {
      type: latestMessageSchema,
      default: null,
    },
  },
  { timestamps: true }
);

// model
const ContactModel = mongoose.model("ContactModel", contactSchema, "contacts");

// exporting model
module.exports = ContactModel;
