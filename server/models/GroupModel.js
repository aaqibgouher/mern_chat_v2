const mongoose = require("mongoose");

// group schema
const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    profileURL: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isGroup: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// model
const GroupModel = mongoose.model("GroupModel", groupSchema, "groups");

// exporting model
module.exports = GroupModel;
