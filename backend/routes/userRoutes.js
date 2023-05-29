const express = require("express");
const router = express.Router();
const {
  userRegister,
  loginUser,
  logout,
  getprofile,
  loggedin,
  editProfile,
  updatepw,
  forgotpw,
  resetpw,
} = require("../controller/userRegister");
const { protect } = require("../middleWare/authMiddleware");
router.post("/register", userRegister);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/userprofile", protect, getprofile);
router.get("/loggedin", loggedin);
router.patch("/editprofile", protect, editProfile);
router.patch("/updatepw", protect, updatepw);
router.post("/forgotpw", forgotpw);
router.put("/resetpw/:resettoken", resetpw);

module.exports = router;
