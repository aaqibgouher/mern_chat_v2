const express = require("express");
const Output = require("../utils/Output");
const messageService = require("../service/messageService");

const getMessages = async (req, res) => {
  try {
    const { toUserId, isGroup } = req.body;

    // calling service file to get messages
    let data = await messageService.getMessages({
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

module.exports = {
  getMessages,
};
