const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/nodemail");
const User = require("../model/userModel");
const contactus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("Please signup");
  }
  if (user) {
    const { subject, message } = req.body;
    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = user.email;
    try {
      sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ message: "Your Concern has been sent" });
    } catch (error) {
      res.status(500);
      throw new Error("Email not sent, Please try again later");
    }
  }
});
module.exports = { contactus };
