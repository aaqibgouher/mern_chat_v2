const express = require("express");
const Output = require("../utils/Output");
const userService = require("../service/userService");
const { default: mongoose } = require("mongoose");

// get users method
const getUsers = async (req, res) => {
  try {
    // calling service file to get users
    let data = await userService.getUsers();

    // returing success output, message, data
    return await Output.success(res, "Successfully get users.", data);
  } catch (e) {
    // else error
    console.log(e, "from get users controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  getUsers,
};
