const { default: mongoose } = require("mongoose");
const Constants = require("../utils/Constants");
const Common = require("../utils/Common");
const { MessageModel, GroupMessageModel } = require("../models");
const userService = require("./userService");

// get user by id (default)
const getSoloMessages = async (params = {}) => {
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

  return messages;
};

// get group message by id
const getGroupMessages = async (params = {}) => {
  console.log(params, "params");
  if (!params || !params.groupId) throw Constants.GROUP_ID_IS_REQUIRED;
  if (!params || !params.userId) throw Constants.TO_ID_IS_REQUIRED;
  if (
    !Common.isObjectIdValid(params.groupId) ||
    !Common.isObjectIdValid(params.userId)
  )
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  const { groupId, userId } = params;
  let messages = [];

  //   check group exists or not
  const group = await userService.getGroup("_id", groupId);

  // if group does not exists
  if (!group) throw Constants.GROUP_DOES_NOT_EXISTS;

  // check if user exists in the group
  const groupMember = await userService.getGroupMembersByGroupIdAndUser(
    groupId,
    userId
  );

  // if group member does not exists
  if (!groupMember) throw Constants.USER_DOES_NOT_EXIST_IN_GROUP;

  //   if user exist in the group, check its not removed from group
  if (groupMember.isDeleted) throw Constants.USER_REMOVED_FROM_GROUP;

  //   if not removed, then check if user left the group
  if (groupMember.isLeft) throw Constants.USER_LEFT_GROUP;

  //   fetch message
  messages = await GroupMessageModel.find({
    toGroupId: groupId,
    isDeleted: "NOT_DELETED",
  });

  return messages;
};

const getSoloMessageByFromAndToAndMessageId = async (
  fromId,
  toId,
  messageId
) => {
  const query = {};
  query["fromUserId"] = fromId;
  query["toUserId"] = toId;
  query["_id"] = messageId;

  let userQuery = MessageModel.findOne(query);

  return await userQuery.exec();
};

const removeMessage = async (params = {}) => {
  if (!params || !params.fromUserId) throw Constants.FROM_ID_IS_REQUIRED;
  if (!params || !params.toUserId) throw Constants.TO_ID_IS_REQUIRED;
  if (!params || !params.messageId) throw Constants.MESSAGE_ID_REQUIRED;
  if (!params || !params.isDeleted) throw Constants.IS_GROUP_REQUIRED;
  if (!params || typeof params.isGroup !== "boolean")
    throw Constants.IS_GROUP_REQUIRED;
  if (
    !Common.isObjectIdValid(params.fromUserId) ||
    !Common.isObjectIdValid(params.toUserId) ||
    !Common.isObjectIdValid(params.messageId)
  )
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  const { fromUserId, toUserId, messageId, isDeleted, isGroup } = params;

  if (isGroup) {
  } else {
    // fetch message by from, to and message id
    const message = await getSoloMessageByFromAndToAndMessageId(
      fromUserId,
      toUserId,
      messageId
    );

    // if message not exists,
    if (!message) throw Constants.MESSAGE_DOES_NOT_EXISTS_FOR_USERS;

    // if exists, is deleted should be NOT_DELETED
    if (message.isDeleted !== "NOT_DELETED")
      throw Constants.MESSAGE_ALREADY_DELETED;

    // delete message
    message.isDeleted = isDeleted ? isDeleted : "NOT_DELETED";
    const savedMessage = await message.save();

    return { fromUserId, toUserId, savedMessage };
  }
};

// export
module.exports = {
  getSoloMessages,
  getGroupMessages,
  removeMessage,
  getSoloMessageByFromAndToAndMessageId,
};
