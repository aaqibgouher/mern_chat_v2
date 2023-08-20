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
  return await ContactModel.find({
    $or: [{ fromUserId: userId }, { toUserId: userId }],
  })
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

const createGroup = async (params = {}) => {
  if (!params || !params.name || typeof params.name !== "string")
    throw Constants.NAME_IS_REQUIRED;
  if (!params || !params.createdBy) throw Constants.CREATED_BY_ID_IS_REQUIRED;
  if (!Common.isObjectIdValid(params.createdBy))
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  const { name, createdBy, description, profileURL } = params;

  // check if group already exists by name by same user
  const groups = await getGroups("createdBy", createdBy);

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
    profileURL: "https://cdn-icons-png.flaticon.com/512/25/25437.png",
    isDeleted: false,
    isGroup: true,
  });

  const savedGroup = await groupData.save();

  return savedGroup._id;
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

const exitGroup = async (params = {}) => {
  if (!Common.isObjectIdValid(params.groupId))
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  const { userId, groupId } = params;
// check if group exists

  // check if user is not in that group
  const groupMember = await getGroupMembersByGroupIdAndUser( groupId, userId );

  if(!groupMember)
    throw "not found";
  
  if(groupMember.isGroupAdmin){

    const members = GroupMemberModel.find({groupId: groupId, isGroupAdmin: true, addedTo: { $ne: userId }, isLeft: false, isDeleted: false });

    let newAdmin = {};
    if(!members.length){
      newAdmin = await GroupMemberModel.findOne({ groupId: groupId, addedTo: { $ne: userId }});
    }

    if(!newAdmin)
      throw "you are the only participant";
    
    newAdmin.isGroupAdmin = true;
    newAdmin.save();
  }

  //await GroupMemberModel.findOneAndDelete({ addedTo: userId, groupId: groupId});
  groupMember.isLeft = true;
  groupMember.save();
  return {userId};
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
  exitGroup,
};
