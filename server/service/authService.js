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

  //  add new user
  const userId = await userService.addUser({ name, email });

  const token = await JWTLibrary.generateToken({ userId });
  // token add
  await addUserToken({ userId, token });
  //   login

  return { userId, token };
};

const addUserToken = async (params) => {
  const userTokenData = new UserTokenModel({
    userId: params.userId,
    token: params.token,
  });

  await userTokenData.save();
};

// export
module.exports = {
  register,
};
