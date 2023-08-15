const express = require("express");
const Output = require("../utils/Output");
const authService = require("../service/authService");
const Common = require("../utils/Common");
const Transaction = require("../utils/Transaction");

// register
const register = async (req, res) => {
  const session = await Transaction.start();
  try {
    const { name, email, password } = req.body;

    // calling register service
    let data = await authService.register({ name, email, password });

    await Transaction.commit(session);

    return await Output.success(
      res,
      `Successfully register user. \n We have sent an email, please check !\n`,
      data
    );
  } catch (e) {
    console.log(e, "from register method controller");
    await Transaction.rollback(session);
    return await Output.error(res, e);
  }
};

// verifiy email
const emailVerify = async (req, res) => {
  try {
    const { userId, code } = req.body;
    // calling email verify service
    let data = await authService.emailVerfiy({ userId, code });

    return await Output.success(
      res,
      `Email Successfully verified`,
      data
    );
  } catch (e) {
    console.log(e, "from emailVerify method controller");
    return await Output.error(res, e);
  }
};

// login
const login = async (req, res) => {
  const session = await Transaction.start();
  try {
    const { email, password } = req.body;

    // calling service file to get users
    let data = await authService.login({ email, password });

    await Transaction.commit(session);

    // returing success output, message, data
    return await Output.success(res, "Successfully login user.", data);
  } catch (e) {
    // else error
    console.log(e, "from login method controller");
    await Transaction.rollback(session);
    return await Output.error(res, e);
  }
};

const logout = async (req, res) => {
  const session = await Transaction.start();
  try {
    let data = await authService.logout(req.user);

    await Transaction.commit(session);

    // returing success output, message, data
    return await Output.success(res, "Successfully logout user.", data);
  } catch (e) {
    // else error
    console.log(e, "from logout method controller");
    await Transaction.rollback(session);
    return await Output.error(res, e);
  }
};

module.exports = {
  register,
  login,
  logout,
  emailVerify,
};
