const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jtoken = require("jsonwebtoken");
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, Please Login");
  }
  const verified = jtoken.verify(token, process.env.JWT_SECRET);
  user = await User.findById(verified.id).select("-password");
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  req.user = user;
  next();
});
module.exports = { protect };
