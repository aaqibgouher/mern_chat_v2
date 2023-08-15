const { default: mongoose } = require("mongoose");
const { UserModel } = require("../models");
const Constants = require("../utils/Constants");

// get user by id (default)
const getUser = async (column = "_id", value = "") => {
  return await UserModel.findOne({ column: value });
};

// add user
const addUser = async (params) => {
  const userData = new UserModel({
    name: params.name,
    email: params.email,
  });

  const savedUser = await userData.save();

  return savedUser._id;
};

// export
module.exports = {
  getUser,
  addUser,
};
