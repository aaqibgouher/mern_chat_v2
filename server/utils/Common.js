const bcrypt = require("bcrypt");

// email validation
const isEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return pattern.test(email);
};

// hash password
const hashPassword = async (password) => {
  // Hash the password
  const saltRounds = 10;

  const hashed = await bcrypt.hash(password, saltRounds);

  return hashed;
};

// decode password
const decodePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = {
  isEmail,
  hashPassword,
  decodePassword,
};
