const mongoose = require("mongoose");

// Seen Schema
const seenSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            required: true,
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
const GroupMemberModel = mongoose.model("GroupMemberModel", groupMessageSchema, "group_members");

// exporting model
module.exports = GroupMemberModel;
