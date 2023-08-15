const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
    profile: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// model
const UserModel = mongoose.model("UserModel", userSchema, "users");

// exporting model
module.exports = UserModel;
