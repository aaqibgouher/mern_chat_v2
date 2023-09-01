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

    // for each users, check connection with logged in user, if connection exists then set new key called isConnected to true, else false
    for (const dataIndex in data) {
      const contact = await userService.getContactByFromAndTo(
        req.user._id,
        data[dataIndex]._id
      );

      data[dataIndex].isConnected = contact ? true : false;
    }

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
    const { name, description, profileURL, members } = req.body;

    // calling service file to create group
    let data = await userService.createGroup({
      name,
      createdBy: req.user._id,
      description,
      profileURL,
      members,
    });

    // returing success output, message, data
    return await Output.success(res, "Successfully created group.", data);
  } catch (e) {
    // else error
    console.log(e, "from create group users controller");
    return await Output.error(res, e);
  }
};

const exitGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.user._id;
    // calling service file to exit group
    let data = await userService.exitGroup({
      userId,
      groupId,
    });

    // returing success output, message, data
    return await Output.success(res, "Successfully exited group.", data);
  } catch (e) {
    // else error
    console.log(e, "from exit group users controller");
    return await Output.error(res, e);
  }
};

const addUserInContact = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.body.to_user_id;
    let data = await userService.addUserInContact({ fromUserId, toUserId });
    // returing success output, message, data
    return await Output.success(
      res,
      "Added User SuccessFully in Contacts",
      data
    );
  } catch (e) {
    // else error
    console.log(e, "from get search users controller");
    return await Output.error(res, e);
  }
};
// add member to group
const addMemberToGroup = async (req, res) => {
  try {
    let { addUserId, groupId, isGroupAdmin } = req.body;

    // calling service file to create group
    let data = await userService.addMemberToGroup({
      addedBy: req.user._id,
      addedTo: addUserId,
      groupId,
      isGroupAdmin,
    });

    // returing success output, message, data
    return await Output.success(
      res,
      "Successfully added member to group.",
      data
    );
  } catch (e) {
    // else error
    console.log(e, "from add member to group users controller");
    return await Output.error(res, e);
  }
};

const getContactDetails = async (req, res) => {
  try {
    const { profileId, isGroup } = req.body;
    let data = await userService.getContactDetails({ profileId, isGroup });
    // returing success output, message, data
    return await Output.success(res, "Successfully get contact details", data);
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
    let data = await userService.removeUserFromGroup({
      group_id,
      toRemove,
      removedBy,
    });
    // returing success output, message, data
    return await Output.success(res, " User Removed From group", data);
  } catch (e) {
    // else error
    console.log(e, "from get search users controller");
    return await Output.error(res, e);
  }
};

const toggleAdminStatus = async (req, res) => {
  try {
    const { userId, groupId } = req.body;
    const adminId = req.user._id;
    // calling service file
    let data = await userService.toggleAdminStatus({
      userId,
      groupId,
      adminId,
    });

    // returing success output, message, data
    return await Output.success(res, "Successfully updated status.", data);
  } catch (e) {
    // else error
    console.log(e, "from toggle admin status user controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  getUser,
  getSearchUsers,
  getConnectedUsers,
  createGroup,
  exitGroup,
  addUserInContact,
  getContactDetails,
  removeUserFromGroup,
  addMemberToGroup,
  toggleAdminStatus,
};
