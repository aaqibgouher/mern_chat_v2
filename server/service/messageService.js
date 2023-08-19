const { default: mongoose } = require("mongoose");
const Constants = require("../utils/Constants");
const Common = require("../utils/Common");
const { MessageModel } = require("../models");
const userService = require("./userService");

// get user by id (default)
const getMessages = async (params = {}) => {
  if (!params || !params.fromUserId) throw Constants.FROM_ID_IS_REQUIRED;
  if (!params || !params.toUserId) throw Constants.TO_ID_IS_REQUIRED;
  if (!params || typeof params.isGroup !== "boolean")
    throw Constants.IS_GROUP_REQUIRED;
  if (
    !Common.isObjectIdValid(params.fromUserId) ||
    !Common.isObjectIdValid(params.toUserId)
  )
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  // to id should exists in users table
  const toUser = await userService.getUser("_id", params.toUserId);

  if (!toUser) throw Constants.USER_NOT_FOUND;

  const { fromUserId, toUserId, isGroup } = params;
  let messages = [];

  // if is group false, then fetch from messages
  if (isGroup === false) {
    messages = await MessageModel.find({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    })
      .sort({
        createdAt: 1,
      })
      .populate("fromUserId", "-password")
      .populate("toUserId", "-password");
  }

  // if is group true, then fetch from group_messages
  else if (isGroup === true) {
  }

  return messages;
};

// export
module.exports = {
  getMessages,
};
