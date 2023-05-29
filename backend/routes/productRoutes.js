const express = require("express");
const router = express.Router();
const { protect } = require("../middleWare/authMiddleware");
const {
  createProduct,
  getallproduct,
  getproduct,
  deleteproduct,
  updateproduct,
} = require("../controller/productController");
const { upload } = require("../utils/fileUpload");
router.post("/", protect, upload.single("photo"), createProduct);
router.get("/allproducts", protect, getallproduct);
router.get("/getproduct/:id", protect, getproduct);
router.delete("/deleteproduct/:id", protect, deleteproduct);
router.patch(
  "/updateproduct/:id",
  protect,
  upload.single("photo"),
  updateproduct
);
module.exports = router;
