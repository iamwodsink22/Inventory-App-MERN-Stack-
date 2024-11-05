const mongoose = require("mongoose");
const productScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please Add Category"],
    },
    quantity: {
      type: String,
      required: [true, "Please add quantity"],
    },
    price: {
      type: String,
      required: [true, "Please Add price"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    photo: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("inventoryproduct", productScheme);
module.exports = Product;
