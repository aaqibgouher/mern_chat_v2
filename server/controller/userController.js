const express = require("express");
const Output = require("../utils/Output");
const userService = require("../service/userService");
const mongoose = require("mongoose");

const getUser = async (req, res) => {
  try {
    console.log(req.user, "user");
    // calling service file to get users
    let data = await userService.getUser("_id", req.user._id);

    // returing success output, message, data
    return await Output.success(res, "Successfully get user details.", data);
  } catch (e) {
    // else error
    console.log(e, "from get user controller");
    return await Output.error(res, e);
  }
};

const getSearchUsers = async (req, res) => {
  try {
    // calling service file to get search users
    let data = await userService.getUsers();

    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Filter out the logged-in user
    data = data.filter((user) => !user._id.equals(userId));

    // returing success output, message, data
    return await Output.success(res, "Successfully get search users.", data);
  } catch (e) {
    // else error
    console.log(e, "from get search users controller");
    return await Output.error(res, e);
  }
};

const getConnectedUsers = async (req, res) => {
  try {
    // calling service file to get connected users
    let data = await userService.getConnectedUsers(req.user._id);

    // returing success output, message, data
    return await Output.success(res, "Successfully get connected users.", data);
  } catch (e) {
    // else error
    console.log(e, "from get connected users controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  getUser,
  getSearchUsers,
  getConnectedUsers,
};
