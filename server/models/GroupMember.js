const mongoose = require("mongoose");

// group schema
const groupSchema = new mongoose.Schema(
  {
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    addedTo: {
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
  },
  { timestamps: true }
);

// model
const GroupModel = mongoose.model("GroupModel", groupSchema, "groups");

// exporting model
module.exports = GroupModel;
