const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

// model
const ContactModel = mongoose.model("ContactModel", contactSchema, "contacts");

// exporting model
module.exports = ContactModel;
