const express = require("express");
const Output = require("../utils/Output");
const authService = require("../service/authService");
const Common = require("../utils/Common");

// register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // calling service file to get users
    let data = await authService.register({ name, email, password });

    // returing success output, message, data
    return await Output.success(
      res,
      `Successfully register user. \n We have sent an email, please check !\n`,
      data
    );
  } catch (e) {
    // else error
    console.log(e, "from register method controller");
    return await Output.error(res, e);
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // calling service file to get users
    let data = await authService.login({ email, password });

    // returing success output, message, data
    return await Output.success(res, "Successfully login user.", data);
  } catch (e) {
    // else error
    console.log(e, "from login method controller");
    return await Output.error(res, e);
  }
};

const logout = async (req, res) => {
  try {
    console.log(req.user, "logged in user detail");
    let data = [];

    // returing success output, message, data
    return await Output.success(res, "Successfully logout user.", data);
  } catch (e) {
    // else error
    console.log(e, "from logout method controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  register,
  login,
  logout,
};
