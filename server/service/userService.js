const { default: mongoose } = require("mongoose");
const {
  UserModel,
  ContactModel,
  GroupModel,
  GroupMemberModel,
  MessageModel,
  GroupMessageModel,
} = require("../models");
const Constants = require("../utils/Constants");
const Common = require("../utils/Common");
const { contactType } = require("../utils/Enums");

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
  const { userId } = filter;

  // creating query
  const query = {};
  if (userId) {
    query._id = { $ne: userId };
  }

  return await UserModel.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: "contacts",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  {
                    $and: [
                      {
                        $eq: ["$fromUserId", userId],
                      },
                      {
                        $eq: ["$toUserId", "$$userId"],
                      },
                    ],
                  },
                  {
                    $and: [
                      {
                        $eq: ["$toUserId", userId],
                      },
                      {
                        $eq: ["$fromUserId", "$$userId"],
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
        as: "contact",
      },
    },
    {
      $addFields: {
        isConnected: {
          $gt: [{ $size: "$contact" }, 0],
        },
      },
    },
    {
      $project: {
        name: 1,
        phone: 1,
        email: 1,
        userName: 1,
        profile: 1,
        about: 1,
        isConnected: 1,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
  ]);
};

const getSearchUsers = async (userId) => {
  return await getUsers({ userId });
};

const getContacts = async (userId, filter = {}) => {
  const { search } = filter;

  // Create a search condition
  let searchCondition = {};
  if (search) {
    searchCondition = {
      $or: [
        { "toUserId.name": { $regex: search, $options: "i" } },
        { "toUserId.phone": { $regex: search, $options: "i" } },
        { "toUserId.email": { $regex: search, $options: "i" } },
      ],
    };
  }

  return await ContactModel.aggregate([
    {
      $match: {
        fromUserId: Common.convertToMongoObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "fromUserId",
        foreignField: "_id",
        as: "fromUserId",
      },
    },
    {
      $unwind: "$fromUserId",
    },
    {
      $lookup: {
        from: "users",
        localField: "toUserId",
        foreignField: "_id",
        as: "toUserId",
      },
    },
    {
      $unwind: "$toUserId",
    },
    {
      $sort: { "latestMessage.createdAt": -1 },
    },
    {
      $match: searchCondition,
    },
    {
      $project: {
        "fromUserId._id": 1,
        "fromUserId.name": 1,
        "fromUserId.profile": 1,
        "fromUserId.about": 1,
        "toUserId._id": 1,
        "toUserId.name": 1,
        "toUserId.profile": 1,
        "toUserId.about": 1,
        isGroup: 1,
        createdAt: 1,
        "latestMessage.message": 1,
        "latestMessage.type": 1,
        "latestMessage.createdAt": 1,
      },
    },
  ]);
};

const getGroupsForContacts = async (userId, filter = {}) => {
  const { search } = filter;

  // Create a search condition
  let searchCondition = {};
  if (search) {
    searchCondition = {
      $or: [
        { "groupId.name": { $regex: search, $options: "i" } },
        { "groupId.description": { $regex: search, $options: "i" } },
      ],
    };
  }

  return await GroupMemberModel.aggregate([
    {
      $match: {
        addedTo: Common.convertToMongoObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "addedBy",
        foreignField: "_id",
        as: "addedBy",
      },
    },
    {
      $unwind: "$addedBy",
    },
    {
      $lookup: {
        from: "users",
        localField: "addedTo",
        foreignField: "_id",
        as: "addedTo",
      },
    },
    {
      $unwind: "$addedTo",
    },
    {
      $lookup: {
        from: "groups",
        localField: "groupId",
        foreignField: "_id",
        as: "groupId",
      },
    },
    {
      $unwind: "$groupId",
    },
    {
      $lookup: {
        from: "group_messages",
        let: { groupId: "$groupId._id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$toGroupId", "$$groupId"],
              },
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
        as: "latestMessage",
      },
    },
    {
      $unwind: {
        path: "$latestMessage",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        isGroup: true,
      },
    },
    {
      $addFields: {
        latestMessageDate: {
          $ifNull: ["$latestMessage.createdAt", "$groupId.createdAt"],
        },
      },
    },
    {
      $sort: {
        latestMessageDate: -1,
      },
    },
    {
      $project: {
        "addedBy._id": 1,
        "addedBy.name": 1,
        "addedBy.profile": 1,
        "addedBy.about": 1,
        "addedTo._id": 1,
        "addedTo.name": 1,
        "addedTo.profile": 1,
        "addedTo.about": 1,
        "groupId._id": 1,
        "groupId.name": 1,
        "groupId.profileURL": 1,
        "groupId.isGroup": 1,
        "groupId.description": 1,
        "groupId.createdAt": 1,
        isGroup: 1,
        createdAt: 1,
        "latestMessage.message": 1,
        "latestMessage.type": 1,
        "latestMessage.createdAt": 1,
        latestMessageDate: 1,
      },
    },
  ]);

  // return await GroupMemberModel.aggregate([
  //   {
  //     $match: {
  //       addedTo: Common.convertToMongoObjectId(userId),
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "addedBy",
  //       foreignField: "_id",
  //       as: "addedBy",
  //     },
  //   },
  //   {
  //     $unwind: "$addedBy",
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "addedTo",
  //       foreignField: "_id",
  //       as: "addedTo",
  //     },
  //   },
  //   {
  //     $unwind: "$addedTo",
  //   },
  //   {
  //     $lookup: {
  //       from: "groups",
  //       localField: "groupId",
  //       foreignField: "_id",
  //       as: "groupId",
  //     },
  //   },
  //   {
  //     $unwind: "$groupId",
  //   },
  //   {
  //     $lookup: {
  //       from: "group_messages",
  //       let: { groupId: "$groupId._id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $eq: ["$toGroupId", "$$groupId"],
  //             },
  //           },
  //         },
  //         { $sort: { createdAt: -1 } },
  //         { $limit: 1 },
  //       ],
  //       as: "latestMessage",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$latestMessage",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $sort: { "latestMessage.createdAt": -1 },
  //   },
  //   {
  //     $addFields: {
  //       isGroup: true,
  //     },
  //   },
  //   {
  //     $project: {
  //       "addedBy._id": 1,
  //       "addedBy.name": 1,
  //       "addedBy.profile": 1,
  //       "addedBy.about": 1,
  //       "addedTo._id": 1,
  //       "addedTo.name": 1,
  //       "addedTo.profile": 1,
  //       "addedTo.about": 1,
  //       "groupId._id": 1,
  //       "groupId.name": 1,
  //       "groupId.profileURL": 1,
  //       "groupId.isGroup": 1,
  //       "groupId.description": 1,
  //       isGroup: 1,
  //       createdAt: 1,
  //       "latestMessage.message": 1,
  //       "latestMessage.type": 1,
  //       "latestMessage.createdAt": 1,
  //     },
  //   },
  // ]);
};

const getConnectedUsers = async ({ type, search, userId }) => {
  let results = [];

  if (type === contactType.SOLO) {
    results = await getContacts(userId, { search });
  } else if (type === contactType.GROUP) {
    results = await getGroupsForContacts(userId, { search });
  } else if (type === contactType.STATUS) {
  }

  return results;
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
  if (!params || !params.fromUserId) throw Constants.FROM_ID_IS_REQUIRED;
  if (!params || !params.toUserId || typeof params.toUserId !== "string")
    throw Constants.TO_ID_IS_REQUIRED;

  const { fromUserId, toUserId } = params;

  if (!Common.isObjectIdValid(fromUserId) || !Common.isObjectIdValid(toUserId))
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  const user = await getUser("_id", toUserId);

  if (!user) throw Constants.USER_NOT_FOUND;
  if (!user.isEmailVerified) throw Constants.USER_NOT_VERIFIED;

  const contacts = await getContact(fromUserId, toUserId);

  // Check if there are already exist in contacts for the same incoming toUserId.
  if (contacts) throw Constants.USER_ALREADY_EXISTS_IN_CONTACTS;

  // setting default latest message from Chatiaoo
  const latestMesssagePayload = {
    message: "Welcome to Chatiyaoo ...",
  };

  const savedContactFromUser = await addToContact(fromUserId, toUserId, {
    latestMessage: latestMesssagePayload,
  });
  const savedContactToUser = await addToContact(toUserId, fromUserId, {
    latestMessage: latestMesssagePayload,
  });

  return { savedContactFromUser, savedContactToUser };
};

const addToContact = async (fromUserId, toUserId, payload) => {
  const { latestMessage } = payload;

  const contactData = new ContactModel({
    fromUserId,
    toUserId,
    latestMessage,
  });

  const savedConatct = await contactData.save();

  return savedConatct._id;
};

const getContact = async (fromUserId, toUserId) => {
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
  const memberIsRemoveBy = await GroupMemberModel.findOne({
    addedTo: removedBy,
  });

  if (!memberToRemove || memberToRemove.isDeleted)
    throw Constants.MEMBERS_NOT_FOUND;

  if (!memberIsRemoveBy || memberIsRemoveBy.isDeleted)
    throw Constants.MEMBERS_NOT_FOUND;

  if (!memberIsRemoveBy.isGroupAdmin) throw Constants.USER_IS_NOT_ADMIN;

  // check admin can not delete superadmin
  console.log(memberToRemove, "memberToRemove");
  if (
    memberToRemove.addedBy.toString().trim() ===
    memberToRemove.addedTo.toString().trim()
  ) {
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
  const resData = [
    {
      removedBy: {
        id: removeBy._id,
        name: removeBy.name,
      },
      toRemoved: {
        id: toRemoved._id,
        name: toRemoved.name,
      },
    },
  ];
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

const sendMessage = async (params) => {
  const { fromUserId, toContactId, message, type, isGroup } = params;
  console.log(params, "from send message");
  if (!toContactId || typeof toContactId !== "string")
    throw Constants.TO_CONTACT_ID_IS_REQUIRED;
  if (!type) throw Constants.MESSAGE_TYPE_IS_REQUIRED;
  if (!message) throw Constants.MESSAGE_ID_REQUIRED;
  if (typeof !isGroup !== "boolean") throw Constants.IS_GROUP_IS_REQUIRED;

  if (fromUserId == toContactId) throw Constants.YOU_CANNOT_MESSAGE_YOURSELF;

  try {
    switch (type) {
      case "text":
        const insertedMessage = await insertMessage({
          isGroup,
          message,
          type,
          fromUserId,
          toContactId,
        });
        return insertedMessage;
      default:
        throw Constants.TYPE_SHOULD_BE_IN_THIS;
    }
  } catch (error) {
    throw error;
  }
};

const insertMessage = async (payload) => {
  try {
    const { isGroup, message, type, fromUserId, toContactId } = payload;

    if (!isGroup) {
      const soloMessage = new MessageModel({
        fromUserId,
        toUserId: toContactId,
        message,
        type,
        seen: false,
      });

      // save message to messages
      const savedSoloMessage = await soloMessage.save();
      const populatedMessage = await MessageModel.findById(savedSoloMessage._id)
        .populate("fromUserId", "-password")
        .populate("toUserId", "-password")
        .exec();

      // save latest message to contacts
      await Promise.all([
        updateContact(
          { fromUserId, toUserId: toContactId },
          { latestMessage: { message, type } }
        ),
        updateContact(
          { fromUserId: toContactId, toUserId: fromUserId },
          { latestMessage: { message, type } }
        ),
      ]);

      console.log(3, "insert done *********");
      return populatedMessage;
    } else {
      const groupMessage = new GroupMessageModel({
        fromUserId,
        toGroupId: toContactId,
        message,
        type,
        seen: [],
        isDeleted: "NOT_DELETED",
      });
      const savedGroupMessage = await groupMessage.save();
      const populatedMessage = await GroupMessageModel.findById(
        savedGroupMessage._id
      )
        .populate("fromUserId", "-password")
        .populate("toGroupId")
        .exec();

      return populatedMessage;
    }
  } catch (error) {
    console.error("Error inserting message:", error);
    throw error; // Rethrow the error for handling further up the call stack
  }
};

const exitGroup = async (params = {}) => {
  if (!Common.isObjectIdValid(params.groupId))
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  const { userId, groupId } = params;

  // check if group exists
  const group = getGroup("_id", groupId);
  if (!group) throw Constants.GROUP_DOES_NOT_EXISTS;

  // check if user is not in that group
  const groupMember = await getGroupMembersByGroupIdAndUser(groupId, userId);

  if (!groupMember || groupMember.isLeft || groupMember.isDeleted)
    throw Constants.USER_DOES_NOT_EXIST_IN_GROUP;

  // If user is group admin
  if (groupMember.isGroupAdmin) {
    // check if another admin exists or not
    const members = GroupMemberModel.find({
      groupId: groupId,
      isGroupAdmin: true,
      addedTo: { $ne: userId },
      isLeft: false,
      isDeleted: false,
    });

    let newAdmin = {};
    // if no one is admin then choose a new admin
    if (!members.length) {
      newAdmin = await GroupMemberModel.findOne({
        groupId: groupId,
        addedTo: { $ne: userId },
      });
    }

    // if user is the only participant
    if (!newAdmin) {
      groupMember.isLeft = true;
      const updateData = {
        isDeleted: true,
      };
      await GroupModel.findByIdAndUpdate(groupId, updateData);
      const savedMember = await groupMember.save();
      return savedMember;
    }

    // if new admin exists
    newAdmin.isGroupAdmin = true;
    await newAdmin.save();
  }

  groupMember.isLeft = true;
  const savedMember = await groupMember.save();
  return savedMember;
};

const toggleAdminStatus = async (params = {}) => {
  const { userId, groupId, adminId } = params;

  if (!Common.isObjectIdValid(groupId))
    throw Constants.ID_SHOULD_BE_CORRECT_MONGO_OBJECT_ID;

  // check if group exists
  const group = getGroup("_id", groupId);
  if (!group) throw Constants.GROUP_DOES_NOT_EXISTS;

  // check if user is not in that group
  const groupMember = await getGroupMembersByGroupIdAndUser(groupId, userId);

  if (!groupMember || groupMember.isLeft || groupMember.isDeleted)
    throw Constants.USER_DOES_NOT_EXIST_IN_GROUP;

  // check if toggler is valid or not
  const admin = await getGroupMembersByGroupIdAndUser(groupId, adminId);
  if (!admin || admin.isLeft || admin.isDeleted || !admin.isGroupAdmin)
    throw Constants.YOU_ARE_NOT_ADMIN;

  // if toggler is toggling himself
  if (userId == adminId) throw Constants.YOU_CANNOT_TOGGLE_YOUR_STATUS;

  // if that user is superadmin
  if (groupMember.addedBy == userId)
    throw Constants.YOU_CANNOT_TOGGLE_SUPERADMIN;

  //updating status
  groupMember.isGroupAdmin = groupMember.isGroupAdmin ^ true;
  const savedMember = await groupMember.save();
  return savedMember;
};

const updateContact = async (condition, dataToUpdate) => {
  return await ContactModel.findOneAndUpdate(
    condition,
    {
      $set: dataToUpdate,
    },
    { new: true, upsert: true }
  );
};

// export
module.exports = {
  getUser,
  addUser,
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
  sendMessage,
  toggleAdminStatus,
  getSearchUsers,
};
