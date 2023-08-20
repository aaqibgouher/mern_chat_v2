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

const createGroup = async (req, res) => {
  try {
    const { name, description, profileURL } = req.body;

    // calling service file to create group
    let data = await userService.createGroup({
      name,
      createdBy: req.user._id,
      description,
      profileURL,
    });

    // returing success output, message, data
    return await Output.success(res, "Successfully created group.", data);
  } catch (e) {
    // else error
    console.log(e, "from create group users controller");
    return await Output.error(res, e);
  }
};

const addUserInContact = async (req, res) => {
  try {

    const fromUserId = req.user._id;
    const toUserId = req.body.to_user_id;
    let data = await userService.addUserInContact({ fromUserId, toUserId });
    // returing success output, message, data
    return await Output.success(res, "Added User SuccessFully in Contacts", data);
  } catch (e) {
    // else error
    console.log(e, "from get search users controller");
    return await Output.error(res, e);
  }
};

const getContactDetails = async (req, res) => {
  try {

    const { profileId, isGroup } = req.body;
    let data = await userService.getContactDetails({ profileId, isGroup });
    // returing success output, message, data
    return await Output.success(res, "Added User SuccessFully in Contacts", data);
  } catch (e) {
    // else error
    console.log(e, "from get search users controller");
    return await Output.error(res, e);
  }
};

const removeUserFromGroup = async (req, res) => {
  try {

    const { group_id, user_id } = req.body;
    const toRemove = user_id;
    const removedBy = req.user._id;
    let data = await userService.removeUserFromGroup({ group_id, toRemove, removedBy });
    // returing success output, message, data
    return await Output.success(res, " User Removed From group", data);
  } catch (e) {
    // else error
    console.log(e, "from get search users controller");
    return await Output.error(res, e);
  }
};


module.exports = {
  getUser,
  getSearchUsers,
  getConnectedUsers,
  createGroup,
  addUserInContact,
  getContactDetails,
  removeUserFromGroup,
};
