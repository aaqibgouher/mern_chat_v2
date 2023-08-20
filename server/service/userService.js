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
    isEmailVerified: true,
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


// get GroupMember 
const getGroupMembers = async (column = "_id", value = "") => {

  const query = {};
  query[column] = value;
  query['isDeleted'] = false;
  query['isLeft'] = false;
  const userQuery = GroupMemberModel.find(query)
    .populate('addedTo');

  return await userQuery.exec();
};


const addUserInContact = async (params = {}) => {

  console.log(params);
  if (!params || !params.toUserId || typeof params.toUserId !== "string")
    throw Constants.USER_ID_IS_REQUIRED;

  if (!Common.isObjectIdValid(params.toUserId))
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;


  const user = await getUser("_id", params.toUserId);

  if (!user) throw Constants.USER_NOT_FOUND;
  if (!user.isEmailVerified) throw Constants.USER_NOT_VERIFIED;

  const { fromUserId, toUserId } = params;
  // Check if there are already exist in contacts for the same incoming toUserId.
  const contacts = await getConatct(fromUserId, toUserId);
  if (contacts) throw Constants.USER_ALREADY_EXISTS_IN_CONTACTS;

  const savedConatctFromUser = await addToConatct(fromUserId, toUserId);
  const savedConatctToUser = await addToConatct(toUserId, fromUserId);

  return { savedConatctFromUser, savedConatctToUser };

}

const addToConatct = async (fromUserId, toUserId) => {
  const contactData = new ContactModel({
    fromUserId,
    toUserId,
  });

  const savedConatct = await contactData.save();

  return savedConatct._id;
}
const getConatct = async (fromUserId, toUserId) => {
  const contacts = await ContactModel.findOne({
    fromUserId,
    toUserId,
  });
  return contacts
}
// here we need to pass two thing isGroup true/false or profileId :
//case 1 
//if isGroup fasle then profileId  will be just userId 
//case 2:
//and isGroup is true  then the profileId will be group id

const getContactDetails = async (params) => {

  const { profileId, isGroup } = params;

  if (!params || !params.profileId || typeof params.profileId !== "string")
    throw Constants.PROFILE_ID_REQUIRED;

  if (isGroup) {

    const group = await getGroup("_id", profileId);
    if (!group) throw Constants.GROUP_DOES_NOT_EXISTS;

    const groupMembersData = await getGroupMembers('groupId', group._id);
    return { group, groupMembersData };

  } else {

    const user = await getUser("_id", profileId);
    if (!user) throw Constants.USER_NOT_FOUND;
    return user;
  }
}

const removeUserFromGroup = async (params = {}) => {
  const { group_id, toRemove, removedBy } = params;

  if (!params || !group_id || typeof group_id !== "string")
    throw Constants.GROUP_ID_IS_REQUIRED;

  if (!params || !toRemove || typeof toRemove !== "string")
    throw Constants.USER_ID_IS_REQUIRED;

  if (!Common.isObjectIdValid(group_id) || !Common.isObjectIdValid(toRemove))
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  const group = await getGroup("_id", group_id);
  if (!group)
    throw Constants.GROUP_DOES_NOT_EXISTS;

  const removedByGroupMember = await getGroupMembersByGroupIdAndUser(group_id, removedBy);
  if (!removedByGroupMember)
    throw Constants.RECORD_NOT_FOUND;

  if (removedByGroupMember.isDeleted)
    throw Constants.USER_NOT_FOUND;

  if (!removedByGroupMember.isGroupAdmin)
    throw Constants.USER_IS_NOT_ADMIN;

  // check admin can not delete superadmin
  const toRemoveGroupMember = await getGroupMembersByGroupIdAndUser(group_id, toRemove);
  if (toRemoveGroupMember.addedBy == toRemoveGroupMember.addedTo)
    throw Constants.USER_CANNOT_DELETE_SUPERADMIN;

  // now delete user from group 
  const memberUpdatedData = await updateGroupMemberDetails({
    id: toRemoveGroupMember._id,
    data: { isDeleted: true },
  });

  if (memberUpdatedData) throw Constants.SOME_THING_WENT_WRONG;
  const removeBy = await getUser("_id", removedBy);
  const toRemoved = await getUser("_id", removedBy);
  const resData = [{
    'removedBy': {
      id: removeBy._id,
      name: removeBy.name,
      createdAt: removeBy.createdAt, // You can replace this with the actual timestamp field you need
      updatedAt: removeBy.updatedAt, // You can replace this with the actual timestamp field you need
    },
    'toRemoved': {
      id: toRemoved._id,
      name: toRemoved.name,
      updatedAt: toRemoved.updatedAt, // You can replace this with the actual timestamp field you need
    },
  }];
  return resData;
}

const updateGroupMemberDetails = async (params) => {
  const { id, data } = params;
  const result = await GroupMemberModel.updateOne({ _id: id }, data);
  if (result.nModified === 1) return true;
  return false;
}

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
  addUserInContact,
  getContactDetails,
  removeUserFromGroup,
};
