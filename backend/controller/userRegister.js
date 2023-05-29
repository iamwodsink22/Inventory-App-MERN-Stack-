const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");
const Token = require("../model/tokenModel");
const bcrypt = require("bcryptjs");
const jtoken = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/nodemail");
const generateToken = (id) => {
  return jtoken.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all required elements");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be greater than 6 characters");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("This email has already been registered");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = generateToken(user._id);
  res.cookie("token", token, {
    path: "/",

    httpOnly: true,
    expires: new Date(Date.now() + 86400 * 1000),
    sameSite: "none",
    // secure: true,
  });
  if (user) {
    const { _id, name, email, phone, photo, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter both email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);

    throw new Error("Email not registered");
  }
  const correctPassword = await bcrypt.compare(password, user.password);
  const token = generateToken(user._id);
  res.cookie("token", token, {
    path: "/",

    httpOnly: true,
    expires: new Date(Date.now() + 86400 * 1000),
    sameSite: "none",
    secure: true,
  });
  if (user && correctPassword) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({ _id, name, email, photo, phone, bio, token });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",

    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
});
const getprofile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, photo, phone_no, bio } = user;
    res.status(201).json({ _id, name, email, photo, phone_no, bio });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
const loggedin = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  const verified = jtoken.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});
const editProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { name, email, photo, phone_no, bio } = user;
    user.name = req.body.name || name;
    user.email = email;
    user.photo = req.body.photo || photo;
    user.phone_no = req.body.phone_no || phone_no;
    user.bio = req.body.bio || bio;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone_no: updatedUser.phone_no,
      bio: updatedUser.bio,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
const updatepw = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("No user Found");
  }
  if (user) {
    const { oldpassword, password } = req.body;
    if (!oldpassword || !password) {
      res.status(400);
      throw new Error("Enter both old password and new password");
    }
    const correctpw = await bcrypt.compare(oldpassword, user.password);
    if (user && correctpw) {
      user.password = password;
      await user.save();
      res.status(200).send("Password changed Successfully");
    } else {
      res.status(400);
      throw new Error("Old password is incorrect");
    }
  }
});
const forgotpw = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("No such user");
  }
  if (user) {
    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }
    const resettoken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resettoken);
    const hashedtoken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");

    await new Token({
      userId: user._id,
      token: hashedtoken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * 60 * 1000,
    }).save();
    const resetUrl = `${process.env.FRONTEND_URL}/resetpw/${resettoken}`;
    const resetmsg = `
    <h1> Hello ${user.name}</h1>
    <p> This reset link is valid only for 30 minutes</p>
    <a href=${resetUrl} clicktracking=off}>${resetUrl}</a>
    <p>Regards</p>
    <p><strong>Team Wodsinkz</strong></p>
    `;
    const subject = "Reset Password Request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;
    try {
      await sendEmail(subject, resetmsg, send_to, sent_from);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    } catch (err) {
      res.status(400);
      throw new Error("Email not sent, try again later");
    }
  }
});
const resetpw = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resettoken } = req.params;
  const hashedtoken = await crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  const userToken = await Token.findOne({
    token: hashedtoken,
    expiresAt: { $gt: Date.now() },
  });
  if (!userToken) {
    res.status(400);
    throw new Error("No such user");
  }
  if (userToken) {
    const user = await User.findOne({ _id: userToken.userId });
    if (user) {
      const { name, email, photo, phone_no, bio } = user;
      user.name = name;
      user.email = email;
      user.photo = photo;
      user.phone_no = phone_no;
      user.bio = bio;
      user.password = password;

      await user.save();
      // res.status(200).json({
      //   _id: updatedUser._id,
      //   name: updatedUser.name,
      //   email: updatedUser.email,
      //   photo: updatedUser.photo,
      //   phone_no: updatedUser.phone_no,
      //   bio: updatedUser.bio,
      // });
      res.status(200).json({ message: "Reset Successfull" });
    }
  }
});

module.exports = {
  userRegister,
  loginUser,
  logout,
  getprofile,
  loggedin,
  editProfile,
  updatepw,
  forgotpw,
  resetpw,
};
