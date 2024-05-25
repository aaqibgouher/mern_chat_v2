const { default: mongoose } = require("mongoose");
const Constants = require("../utils/Constants");
const Common = require("../utils/Common");
const { MessageModel, GroupMessageModel } = require("../models");
const userService = require("./userService");

// get user by id (default)
const getSoloMessages = async (params = {}) => {
  if (!params || !params.fromUserId) throw Constants.FROM_ID_IS_REQUIRED;
  if (!params || !params.toUserId) throw Constants.TO_ID_IS_REQUIRED;
  if (
    !Common.isObjectIdValid(params.fromUserId) ||
    !Common.isObjectIdValid(params.toUserId)
  )
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  // to id should exists in users table
  const toUser = await userService.getUser("_id", params.toUserId);

  if (!toUser) throw Constants.USER_NOT_FOUND;

  const { fromUserId, toUserId } = params;
  let messages = [];

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
  }).populate("fromUserId", "-password");

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
  if (!params || !["ME", "EVERYONE"].includes(params.isDeleted))
    throw Constants.DELETE_CAN_ONLY_BE_FROM_ME_OR_EVERYONE;
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
    let message = await getSoloMessageByFromAndToAndMessageId(
      fromUserId,
      toUserId,
      messageId
    );

    // if message not exists,
    if (!message) throw Constants.MESSAGE_DOES_NOT_EXISTS_FOR_USERS;

    // if deleted from everyone
    if (message.deleteFromEveryone === true)
      throw Constants.MESSAGE_ALREADY_DELETED_FROM_EVERYONE;

    // if deleted from me
    if (message.deletedFrom.some((item) => item.fromUserId.equals(fromUserId)))
      throw Constants.MESSAGE_ALREADY_DELETED;

    // it is neither deleted from me, nor everyone
    // if coming isDelete = ME, add my id to deletedFrom, else if isDelete = EVERYONE, then set deleteFromEveryone true
    let savedDeleteMessage = {};

    if (isDeleted === "ME") {
      message.deletedFrom.push({ fromUserId, deletedAt: Date.now() });
      savedDeleteMessage = await message.save();
    } else if (isDeleted === "EVERYONE") {
      message.deleteFromEveryone = true;
      savedDeleteMessage = await message.save();
    }

    return savedDeleteMessage;
  }
};

// export
module.exports = {
  getSoloMessages,
  getGroupMessages,
  removeMessage,
  getSoloMessageByFromAndToAndMessageId,
};
