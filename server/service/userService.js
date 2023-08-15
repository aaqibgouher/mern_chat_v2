const { default: mongoose } = require("mongoose");
const { UserModel } = require("../models");
const Constants = require("../utils/Constants");
const Common = require("../utils/Common");

// get user by id (default)
const getUser = async (column = "_id", value = "") => {
  const query = {};
  query[column] = value;

  return await UserModel.findOne(query);
};

// add user
const addUser = async (params) => {
  const hashed = await Common.hashPassword(params.password);

  const userData = new UserModel({
    name: params.name,
    email: params.email,
    password: hashed,
    userName: params.email.split("@")[0],
    profile: "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    about: "Hello I am " + ' ' + params.name,
  });

  const savedUser = await userData.save();

  return savedUser._id;
};

// export
module.exports = {
  getUser,
  addUser,
};
