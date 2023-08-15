const { default: mongoose } = require("mongoose");
const Common = require("../utils/Common");
const Constants = require("../utils/Constants");
const userService = require("./userService");

// get users
const register = async (params) => {
  // validations
  if (!params || !params.name || typeof params.name !== "string")
    throw Constants.NAME_IS_REQUIRED;
  if (!params || !params.email || typeof params.email !== "string")
    throw Constants.EMAIL_IS_REQUIRED;

  // email  validation
  if (!Common.isEmail(params.email)) throw Constants.VALID_EMAIL_IS_REQUIRED;

  const { name, email } = params;

  //   check email & number exists in db
  const user = await userService.getUser("email", email);
  console.log(user, "user");
  if (user) throw Constants.USER_ALREADY_EXISTS;

  //   new user
  const userId = await userService.addUser({ name, email });

  //    user add
  //   token generate
  // token add
  //   login

  return { userId, token: "" };
};

// export
module.exports = {
  register,
};
