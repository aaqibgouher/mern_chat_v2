const Output = require("../utils/Output");
const JWTLibrary = require("../utils/JWTLibrary");
const userService = require("../service/userService");
const authService = require("../service/authService");

// Authentication middleware
const isAuthenticate = async (req, res, next) => {
  try {
    // taking token
    const token = req.headers.authorization?.split(" ")[1];

    // if not present, show err
    if (!token) throw "Please login to continue";

    // decoding token
    const decoded = await JWTLibrary.decodeToken(token);

    if (!decoded) throw "Invalid token";

    // if decoded, data is present, check user present with id or not
    let user = await userService.getUser("_id", decoded.userId);

    if (!user)
      throw "User does not exists, Some issue with JWT, Please login once again";

    // if user is true, then check for token exis
    const userToken = await authService.getUserTokenByIdAndToken(
      user._id,
      token
    );

    if (!userToken) throw "User exists, please check your token";

    // if everyting correct, setting company detail to request, allowing them as an authorized user
    req.user = user;
    req.user.token = token;

    next();
  } catch (e) {
    // else error
    console.log(e, "from auth middleware");
    return await Output.error(res, e);
  }
};

// Socket Authenticate Middleware
const isAuthenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) throw "Please login to continue";

    const decoded = await JWTLibrary.decodeToken(token);

    if (!decoded) throw "Invalid token";

    const user = await userService.getUser("_id", decoded.userId);

    if (!user) throw "User does not exist, please login again";

    const userToken = await authService.getUserTokenByIdAndToken(
      user._id,
      token
    );

    if (!userToken) throw "Invalid token";

    socket.user = user;
    socket.user.token = token;

    next();
  } catch (e) {
    console.log(e, "from auth middleware");
    return next(new Error(e));
  }
};

module.exports = {
  isAuthenticate,
  isAuthenticateSocket,
};
