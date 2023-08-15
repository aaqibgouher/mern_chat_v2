const Output = require("../utils/Output");
// Authentication middleware
const isEmailVerified = async (req, res, next) => {
    try {
        // taking token
        console.log(req.user, 'isEmailVerified');
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
