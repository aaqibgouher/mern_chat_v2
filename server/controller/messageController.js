const express = require("express");
const Output = require("../utils/Output");
const messageService = require("../service/messageService");

const getSoloMessages = async (req, res) => {
  try {
    const { toUserId, isGroup } = req.body;

    // calling service file to get messages
    let data = await messageService.getSoloMessages({
      fromUserId: req.user._id,
      toUserId,
      isGroup,
    });

    // returing success output, message, data
    return await Output.success(res, "Successfully get user messages.", data);
  } catch (e) {
    // else error
    console.log(e, "from get message controller");
    return await Output.error(res, e);
  }
};

const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    // calling service file to get group messages
    let data = await messageService.getGroupMessages({
      groupId,
      userId: req.user._id,
    });

    // returing success output, message, data
    return await Output.success(res, "Successfully get group messages.", data);
  } catch (e) {
    // else error
    console.log(e, "from get group message controller");
    return await Output.error(res, e);
  }
};

const removeMessage = async (req, res) => {
  try {
    const { toUserId, messageId, isDeleted, isGroup } = req.body;

    // calling service file to delete message
    let data = await messageService.removeMessage({
      fromUserId: req.user._id,
      toUserId,
      messageId,
      isDeleted,
      isGroup,
    });

    // returing success output, message, data
    return await Output.success(res, "Successfully removed message.", data);
  } catch (e) {
    // else error
    console.log(e, "from remove message controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  getSoloMessages,
  getGroupMessages,
  removeMessage,
};
