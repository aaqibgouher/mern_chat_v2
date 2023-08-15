const mongoose = require("mongoose");

// group schema
const groupMemberSchema = new mongoose.Schema(
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
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupModel",
      required: true,
    },
    isGroupAdmin: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: "",
    },
    isLeft: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

// model
const GroupMemberModel = mongoose.model("GroupMemberModel", groupMemberSchema, "group_members");

// exporting model
module.exports = GroupMemberModel;
