const User = require("../models/User");
const Note = require("../models/Note");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// description off express-async-handler package
// i use this package for don't put try catch each middleware this function gonna wrap the all middleware with try catch block

// @desc Get all users
// @route GET /users
// @access Private
exports.getAllUser = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(400).json({ message: "No user found" });
  }
  res.json(users);
});

// @desc Create a new user
// @route POST /users
// @access Private
exports.createNewUser = asyncHandler(async (req, res, next) => {});

// @desc Updtae a  user
// @route PATCH /users
// @access Private
exports.uptadeUser = asyncHandler(async (req, res, next) => {});

// @desc Delete a  user
// @route DELETE /users
// @access Private
exports.deleteUser = asyncHandler(async (req, res, next) => {});
