const Common = require("../utils/Common");
const Constants = require("../utils/Constants");
const userService = require("./userService");
const JWTLibrary = require("../utils/JWTLibrary");
const { UserTokenModel, UserModel } = require("../models");

// get users
const register = async (params) => {
  // basic validations
  if (!params || !params.name || typeof params.name !== "string")
    throw Constants.NAME_IS_REQUIRED;
  if (!params || !params.email || typeof params.email !== "string")
    throw Constants.EMAIL_IS_REQUIRED;
  if (!params || !params.password || typeof params.email !== "string")
    throw Constants.PASSWORD_IS_REQUIRED;

  // email validation
  if (!Common.isEmail(params.email)) throw Constants.VALID_EMAIL_IS_REQUIRED;

  const { name, email, password } = params;

  // check email exists in db
  const user = await userService.getUser("email", email);

  // if user exists, throw error
  if (user) throw Constants.USER_ALREADY_EXISTS;

  // generate code
  const code = await Common.generateOTP();

  // add new user
  const userId = await userService.addUser({ name, email, password, code });

  // send email
  const emailRes = await Common.sendEmail(
    email,
    await Common.getEmailSubject(),
    await Common.getEmailContent(code)
  );

  const loginRes = await login({ email, password });
  loginRes.isEmailVerified = false;
  loginRes.emailRes = emailRes;

  return loginRes;
};

const addUserToken = async (params) => {
  const userTokenData = new UserTokenModel({
    userId: params.userId,
    token: params.token,
  });

  await userTokenData.save();
};

// Email verification function

const emailVerfiy = async (params) => {
  if (!params || !params.userId) throw Constants.USER_ID_IS_REQUIRED;

  if (!params || !params.code || typeof params.code !== "string")
    throw Constants.EMIAL_CODE_IS_REQUIRED;

  const user = await userService.getUser("_id", params.userId);
  if (!user) throw Constants.USER_NOT_FOUND;

  if (user.isEmailVerified) throw Constants.EMAIL_IS_ALREADY_VERIFIED;

  if (user.code !== params.code) throw Constants.INVAILD_CODE;

  const updatedUser = await UserModel.updateUser(params.userId, {
    isEmailVerified: true,
  });

  return updatedUser;
};

// login user function

const login = async (params = {}) => {
  // validation
  if (!params || !params.email || typeof params.email !== "string")
    throw Constants.EMAIL_IS_REQUIRED;
  if (!params || !params.password || typeof params.email !== "string")
    throw Constants.PASSWORD_IS_REQUIRED;

  // email  validation
  if (!Common.isEmail(params.email)) throw Constants.VALID_EMAIL_IS_REQUIRED;

  const user = await userService.getUser("email", params.email, true);

  //   if user exists, throw error
  if (!user) throw Constants.USER_NOT_FOUND;

  //   password validated
  if (!(await Common.decodePassword(params.password, user.password)))
    throw Constants.INVALID_PASSWORD;

  const token = await JWTLibrary.generateToken({ userId: user._id });

  // token add
  await addUserToken({ userId: user._id, token });

  return { userId: user._id, token };
};

// logout user function
const logout = async (user) => {
  //   get user token by user id and token
  const userToken = await getUserTokenByIdAndToken(user._id, user.token);

  //   delete token from db
  await deleteUserTokenById(userToken._id);

  return { userId: user._id };
};

const getUserTokenByIdAndToken = async (userId, token) => {
  return await UserTokenModel.findOne({
    userId,
    token,
  });
};

// delete user token while logout
const deleteUserTokenById = async (tokenId) => {
  const result = await UserTokenModel.deleteOne({ _id: tokenId });

  if (result.deletedCount === 1) {
    console.log("Document deleted successfully");
  } else {
    console.log("Document not found or not deleted");
  }
};

// export
module.exports = {
  register,
  login,
  addUserToken,
  logout,
  getUserTokenByIdAndToken,
  deleteUserTokenById,
  emailVerfiy,
};
