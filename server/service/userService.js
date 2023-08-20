const { default: mongoose } = require("mongoose");
const {
  UserModel,
  ContactModel,
  GroupModel,
  GroupMemberModel,
} = require("../models");
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

const getUsers = async (filter = {}) => {
  const defaultFilter = { isEmailVerified: true };

  const finalFilter = { ...defaultFilter, ...filter };

  return await UserModel.find(finalFilter).select("-password");
};

const getContacts = async (userId, filter = {}) => {
  return await ContactModel.find({ fromUserId: userId })
    .populate("fromUserId", "-password")
    .populate("toUserId", "-password");
};

const getGroupsForContacts = async (userId, filter = {}) => {
  return await GroupMemberModel.find({ addedTo: userId })
    .populate("addedBy", "-password")
    .populate("addedTo", "-password")
    .populate("groupId");
};

const getConnectedUsers = async (userId, filter = {}) => {
  const solo = await getContacts(userId);
  const groups = await getGroupsForContacts(userId);

  return [...solo, ...groups];
};

const getGroups = async (column = "_id", value = "") => {
  const query = {};
  query[column] = value;

  let userQuery = GroupModel.find(query);

  return await userQuery.exec();
};

// create group
const createGroup = async (params = {}) => {
  // validations
  if (!params || !params.name || typeof params.name !== "string")
    throw Constants.NAME_IS_REQUIRED;
  if (!params || !params.createdBy) throw Constants.CREATED_BY_ID_IS_REQUIRED;
  if (!Common.isObjectIdValid(params.createdBy))
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;
  if (!params || !params.members) throw Constants.MEMBERS_ARE_REQUIRED;

  const { name, createdBy, description, profileURL } = params;
  let { members } = params;

  // atleast one members should be in the group
  if (!members.length) throw Constants.ATLEAST_ONE_MEMBER_SHOULD_BE_ADDED;

  // check if group already exists by name by same user
  const groups = await getGroups("createdBy", createdBy);

  // looping an comparing name, if exists means group is already created by user
  for (const groupIndex in groups) {
    if (groups[groupIndex].name === name) {
      throw Constants.GROUP_ALREADY_EXISTS;
      break;
    }
  }

  // for logged in user, group is new, we can create new
  const groupData = new GroupModel({
    name,
    createdBy,
    description,
    profileURL: profileURL
      ? profileURL
      : "https://cdn-icons-png.flaticon.com/512/25/25437.png",
    isDeleted: false,
    isGroup: true,
  });

  const savedGroup = await groupData.save();

  // once group is added, we need to add participants as well
  // adding created by to members id at first index
  members.unshift(createdBy);

  let savedMembers = [];

  // looping over members, and adding to group member
  for (const member in members) {
    savedMembers.push(
      await addMemberToGroup({
        addedBy: createdBy,
        addedTo: Common.convertToMongoObjectId(members[member]),
        groupId: savedGroup._id,
      })
    );
  }

  return savedMembers;
};

const getGroupMembersByGroupIdAndUser = async (groupId, userId) => {
  return await GroupMemberModel.findOne({ groupId, addedTo: userId });
};

const getGroup = async (column = "_id", value = "", isDeleted = false) => {
  const query = {};
  query[column] = value;

  let userQuery = GroupModel.findOne(query);

  if (isDeleted) {
    userQuery = userQuery.and({ isDeleted: true });
  }

  return await userQuery.exec();
};

// add member to group
const addMemberToGroup = async (params = {}) => {
  // validations
  if (!params || !params.addedBy) throw Constants.FROM_ID_IS_REQUIRED;
  if (!params || !params.addedTo) throw Constants.TO_ID_IS_REQUIRED;
  if (!params || !params.groupId) throw Constants.GROUP_ID_IS_REQUIRED;
  if (
    !Common.isObjectIdValid(params.addedBy) ||
    !Common.isObjectIdValid(params.addedTo) ||
    !Common.isObjectIdValid(params.groupId)
  )
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  const { addedBy, addedTo, groupId } = params;

  // added to user id exists
  const addedToUser = await getUser("_id", addedTo);

  if (!addedToUser) throw Constants.ADDING_USER_DOES_NOT_EXISTS;

  // check is verified or not
  if (!addedToUser.isEmailVerified) throw Constants.EMAIL_VERIFICATION_REQUIRED;

  // group id exists
  const group = await getGroup("_id", groupId);

  if (!group) throw Constants.GROUP_DOES_NOT_EXISTS;

  // check if user exists in the group or not
  const groupMember = await getGroupMembersByGroupIdAndUser(groupId, addedTo);

  if (groupMember) throw Constants.USER_ALREADY_EXISTS_IN_GROUP;

  // user does not exists in the group, we can add now
  const groupMemberData = new GroupMemberModel({
    addedBy,
    addedTo,
    groupId,
    isGroupAdmin: false,
  });

  const savedGroupMember = groupMemberData.save();

  return { addUserId: addedTo, groupId, groupMemberId: savedGroupMember._id };
};

const getContactByFromAndTo = async (fromUserId, toUserId) => {
  return await ContactModel.findOne({ fromUserId, toUserId });
};

// export
module.exports = {
  getUser,
  addUser,
  getUsers,
  getUsers,
  getConnectedUsers,
  getContacts,
  getGroupsForContacts,
  createGroup,
  getGroupMembersByGroupIdAndUser,
  getGroup,
  addMemberToGroup,
  getContactByFromAndTo,
};
