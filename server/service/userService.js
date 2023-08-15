const { default: mongoose } = require("mongoose");
const { UserModel } = require("../models");
const Constants = require("../utils/Constants");
const Common = require("../utils/Common");

// get user by id (default)
const getUser = async (column = "_id", value = "", includePassword = false) => {
  const query = {};
  query[column] = value;

  let userQuery = UserModel.findOne(query);

  if (!includePassword) {
    userQuery = userQuery.select("-password");
  }

  return await userQuery.exec();
};


// add user
const addUser = async (params) => {
  const hashed = await Common.hashPassword(params.password);

  const userData = new UserModel({
    name: params.name,
    email: params.email,
    password: hashed,
    userName: params.email.split("@")[0],
    profile:
      "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    about: "Hello I am " + " " + params.name,
    code: params.code,
  });

  const savedUser = await userData.save();

  return savedUser._id;
};

const getUsers = async () => {
  return await UserModel.find().select('-password');
};



// export
module.exports = {
  getUser,
  addUser,
  getUsers,
};
