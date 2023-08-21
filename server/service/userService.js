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
        addedTo: await Common.convertToMongoObjectId(members[member]),
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

// get GroupMember
const getGroupMembers = async (column = "_id", value = "") => {
  const query = {};
  query[column] = value;
  query["isDeleted"] = false;
  query["isLeft"] = false;
  const userQuery = GroupMemberModel.find(query).populate(
    "addedTo",
    "-password"
  );

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
};

const addToConatct = async (fromUserId, toUserId) => {
  const contactData = new ContactModel({
    fromUserId,
    toUserId,
  });

  const savedConatct = await contactData.save();

  return savedConatct._id;
};
const getConatct = async (fromUserId, toUserId) => {
  const contacts = await ContactModel.findOne({
    fromUserId,
    toUserId,
  });
  return contacts;
};
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

    const groupMembersData = await getGroupMembers("groupId", group._id);
    return { group, groupMembersData };
  } else {
    const user = await getUser("_id", profileId);
    if (!user) throw Constants.USER_NOT_FOUND;
    return user;
  }
};

const removeUserFromGroup = async (params = {}) => {
  const { group_id, toRemove, removedBy } = params;

  if (!params || !group_id || typeof group_id !== "string")
    throw Constants.GROUP_ID_IS_REQUIRED;

  if (!params || !toRemove || typeof toRemove !== "string")
    throw Constants.USER_ID_IS_REQUIRED;

  if (!Common.isObjectIdValid(group_id) || !Common.isObjectIdValid(toRemove))
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  const group = await getGroup("_id", group_id);
  if (!group) throw Constants.GROUP_DOES_NOT_EXISTS;

  const memberToRemove = await GroupMemberModel.findOne({ addedTo: toRemove });
  const memberIsRemoveBy = await GroupMemberModel.findOne({ addedTo: removedBy });

  if (!memberToRemove || memberToRemove.isDeleted)
    throw Constants.MEMBERS_NOT_FOUND;

  if (!memberIsRemoveBy || memberIsRemoveBy.isDeleted)
    throw Constants.MEMBERS_NOT_FOUND;

  if (!memberIsRemoveBy.isGroupAdmin)
    throw Constants.USER_IS_NOT_ADMIN;

  // check admin can not delete superadmin
  if (memberToRemove.addedBy.toString().trim() === memberToRemove.addedTo.toString().trim()) {
    throw Constants.USER_CANNOT_DELETE_SUPERADMIN;
  }

  // now delete user from group
  const memberUpdatedData = await updateGroupMemberDetails({
    id: memberToRemove._id,
    data: { deletedAt: new Date(), isDeleted: true },
  });

  if (memberUpdatedData) throw Constants.SOME_THING_WENT_WRONG;
  const removeBy = await getUser("_id", removedBy);
  const toRemoved = await getUser("_id", toRemove);
  const resData = [{
    'removedBy': {
      id: removeBy._id,
      name: removeBy.name,
    },
    'toRemoved': {
      id: toRemoved._id,
      name: toRemoved.name,
    },
  }];
  return resData;
};

const updateGroupMemberDetails = async (params) => {
  const { id, data } = params;
  const result = await GroupMemberModel.updateOne({ _id: id }, data);
  if (result.nModified === 1) return true;
  return false;
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

  // check if addedBy is admin
  const addedByGroupMember = await getGroupMembersByGroupIdAndUser(
    groupId,
    addedBy
  );

  if (addedByGroupMember && !addedByGroupMember.isGroupAdmin)
    throw Constants.USER_IS_NOT_ADMIN;

  // check if user exists in the group or not
  const groupMember = await getGroupMembersByGroupIdAndUser(groupId, addedTo);

  // if group member already exists, check if deleted, if deleted change delete to false, and if not deleted, then already exists
  if (groupMember) {
    if (groupMember.isDeleted) {
      groupMember.isDeleted = false;
      groupMember.deletedAt = null;

      const savedGroupMemberDeleted = await groupMember.save();

      return savedGroupMemberDeleted;
    } else {
      throw Constants.USER_ALREADY_EXISTS_IN_GROUP;
    }
  }

  // user does not exists in the group, we can add now
  const groupMemberData = new GroupMemberModel({
    addedBy,
    addedTo,
    groupId,
    isGroupAdmin: addedBy.equals(addedTo) ? true : false,
  });

  const savedGroupMember = await groupMemberData.save();

  return savedGroupMember;
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
  exitGroup,
  addUserInContact,
  getContactDetails,
  removeUserFromGroup,
  addMemberToGroup,
  getContactByFromAndTo,
};
