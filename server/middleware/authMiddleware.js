const Output = require("../utils/Output");
const JWTLibrary = require("../utils/JWTLibrary");
const userService = require("../service/userService");

// Authentication middleware
const isAuthenticate = async (req, res, next) => {
  try {
    // taking token
    const token = req.headers.authorization?.split(" ")[1];

    // // if not present, show err
    if (!token) throw "Please login to continue";

    // // decoding token
    const decoded = await JWTLibrary.decodeToken(token);

    if (!decoded) throw "Invalid token";

    // // if decoded, data is present, check user present with id or not
    let user = await userService.getUser("_id", decoded.userId);

    if (!user)
      throw "User does not exists, Some issue with JWT, Please login once again";

    // if everyting correct, setting company detail to request, allowing them as an authorized user
    req.user = user;

    next();
  } catch (e) {
    // else error
    console.log(e, "from auth middleware");
    return await Output.error(res, e);
  }
};

module.exports = {
  isAuthenticate,
};
