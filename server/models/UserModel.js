const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
    code: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// model
const UserModel = mongoose.model("UserModel", userSchema, "users");

// exporting model
module.exports = UserModel;
