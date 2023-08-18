const Output = require("../utils/Output");
// Authentication middleware
const isEmailVerified = async (req, res, next) => {
  try {
    // verifying is email column
    if (!req.user.isEmailVerified) throw "Please verify your email first";

    next();
  } catch (e) {
    // else error
    console.log(e, "from emailVerified middleware");
    return await Output.error(res, e);
  }
};

module.exports = {
  isEmailVerified,
};
