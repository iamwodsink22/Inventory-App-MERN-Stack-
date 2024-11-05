const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const { getFileSize } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "decm4dhbo",
  api_key: "421742784788333",
  api_secret: "r_WswHNjhYYVcjwovnWBfBeCwDU",
});
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;
  if (!name || !quantity || !price || !category || !description) {
    res.status(400);
    throw new Error("Please fill the required blocks");
  }
  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      console.log(error);
      throw new Error("File not uploaded to cloudinary");
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: getFileSize(req.file.size),
    };
  }
  if (!req.file) {
    console.log("Nofile");
  }
  const productExist = await Product.findOne({ sku });
  if (productExist) {
    res.status(400);
    throw new Error("Product already present");
  }
  if (!productExist) {
    const product = await Product.create({
      user: req.user.id,
      name,
      sku,
      category,
      quantity,
      price,
      description,
      photo: fileData,
    });
    if (product) {
      res.status(201).json(product);
    }
  }
});
const getallproduct = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error("No Products found");
  }
});
const getproduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("No such product found");
  } else {
    res.status(200).json(product);
  }
});
const deleteproduct = asyncHandler(async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json(product);
});
const updateproduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("No such product");
  }
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User authorized");
  }

  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      console.log(error);
      throw new Error("File not uploaded to cloudinary");
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: getFileSize(req.file.size),
    };
  }
  if (!req.file) {
    console.log("Nofile");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name,

      category,
      quantity,
      price,
      description,
      photo: Object.keys(fileData).length == 0 ? product.photo : fileData,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getallproduct,
  getproduct,
  deleteproduct,
  updateproduct,
  deleteproduct,
};
