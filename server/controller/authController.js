const express = require("express");
const Output = require("../utils/Output");
const authService = require("../service/authService");

// register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // calling service file to get users
    let data = await authService.register({ name, email, password });

    // returing success output, message, data
    return await Output.success(res, "Successfully register user.", data);
  } catch (e) {
    // else error
    console.log(e, "from register method controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  register,
};
