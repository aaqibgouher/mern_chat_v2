const { default: mongoose } = require("mongoose");
const Common = require("../utils/Common");
const Constants = require("../utils/Constants");
const userService = require("./userService");
const JWTLibrary = require("../utils/JWTLibrary");
const { UserTokenModel } = require("../models");

// get users
const register = async (params) => {
  // validations
  if (!params || !params.name || typeof params.name !== "string")
    throw Constants.NAME_IS_REQUIRED;
  if (!params || !params.email || typeof params.email !== "string")
    throw Constants.EMAIL_IS_REQUIRED;
  if (!params || !params.password || typeof params.email !== "string")
    throw Constants.PASSWORD_IS_REQUIRED;

  // email  validation
  if (!Common.isEmail(params.email)) throw Constants.VALID_EMAIL_IS_REQUIRED;

  const { name, email, password } = params;

  //   check email & number exists in db
  const user = await userService.getUser("email", email);

  //   if user exists, throw error
  if (user) throw Constants.USER_ALREADY_EXISTS;

  //   code generate
  const code = await Common.generateOTP();

  //  add new user
  const userId = await userService.addUser({ name, email, password, code });

  //   send email
  const emailRes = await Common.sendEmail(
    email,
    "Welcome to Chatiyaoo!",
    `
    <h1>Welcome to Our Team!</h1>
    <p>We are extremely happy to have you in our team!</p>
    <p>Below is the code for Email Verification: <strong>${code}</strong></p>
    `
  );

  return {
    userId,
    isEmailVerified: false,
    emailRes,
  };
};

const addUserToken = async (params) => {
  const userTokenData = new UserTokenModel({
    userId: params.userId,
    token: params.token,
  });

  await userTokenData.save();
};

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

// export
module.exports = {
  register,
  login,
  addUserToken,
};
