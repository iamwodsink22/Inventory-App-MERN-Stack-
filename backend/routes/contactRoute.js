const express = require("express");
const { protect } = require("../middleWare/authMiddleware");
const { contactus } = require("../controller/contactController");
const { protectus } = require("../controller/contactController");
const router = express.Router();
router.post("/", protect, contactus);
module.exports = router;
