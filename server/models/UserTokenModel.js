const mongoose = require("mongoose");

// user token schema
const userTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// model
const UserTokenModel = mongoose.model(
  "UserTokenModel",
  userTokenSchema,
  "user_tokens"
);

// exporting model
module.exports = UserTokenModel;
