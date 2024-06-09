const User = require("../models/User");
const Note = require("../models/Note");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// description off express-async-handler package
// i use this package for don't put try catch each middleware this function gonna wrap the all middleware with try catch block

//why using exec if you forget read https://mongoosejs.com/docs/promises.html
// @desc Get all users
// @route GET /users
// @access Private
exports.getAllUser = asyncHandler(async (req, res, next) => {
  const user = res.user;
  const isEmployee = user.roles.length === 1 && user.roles.includes("Employee");

  const users = await User.find(isEmployee ? { username: user.username } : null)
    .select("-password")
    .lean();
  if (!users.length) {
    return res.status(400).json({ message: "No user found" });
  }
  res.json(users);
});

// @desc Create a new user
// @route POST /users
// @access Private
exports.createNewUser = asyncHandler(async (req, res, next) => {
  const { username, password, roles } = req.body;
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All field are required" });
  }
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = User.create({ username, password: hashedPassword, roles });
  if (user) {
    //created
    res.status(201).json({
      message: `New user ${username} created`,
    });
  } else {
    res.status(400).json({
      message: "Invalid user data received",
    });
  }
});

// @desc Update a  user
// @route PATCH /users
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id, username, roles, active, password } = req.body;
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All field are required" });
  }
  const user = await User.findById(id).exec();

  if (!user) {
    //not found user
    return res.status(400).json({ message: "User not found" });
  }
  //check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate._id.toString() !== id) {
    // if username already exists
    return res.status(400).json({
      message: "Duplicate username",
    });
  }
  user.username = username;
  user.roles = roles;
  user.active = active;
  if (password) {
    const hashedPassword = bcrypt.hash(password, 12);
    user.password = hashedPassword;
  }
  const updatedUser = await user.save();

  return res.json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a  user
// @route DELETE /users
// @access Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }
  //check is user assigned to any job
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).json({
      code: "USER_ASSIGNED_JOB",
      message: "User has assigned to job",
    });
  }

  const user = await User.findByIdAndDelete(id).exec();
  if (!user) {
    // if not found user
    return res.status(400).json({ message: "User not found" });
  }

  res.json({ message: `Username ${user.username} Id ${user._id} deleted` });
});
