const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoute");
const errmiddleware = require("./middleWare/errormidlleware");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: ["https://inventory-app-mern-stack.vercel.app"], credentials: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/contact", contactRoutes);
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use(errmiddleware);
const PORT = process.env.PORT;
const URL = process.env.URL;
mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening on 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
