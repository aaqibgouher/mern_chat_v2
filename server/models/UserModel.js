const mongoose = require("mongoose");
const Constants = require("../utils/Constants");

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

const updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      throw Constants.USER_NOT_FOUND;
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
// update user
userSchema.statics.updateUser = async function (userId, updateData) {
  try {
    const updatedUser = await this.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      throw Constants.USER_NOT_FOUND;
    }
    return updatedUser;

  } catch (error) {
    throw error;
  }
};

// model
const UserModel = mongoose.model("UserModel", userSchema, "users");

// exporting model
module.exports = UserModel;
