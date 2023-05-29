const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a name"],
      minLength: [6, "Password length must be upto 6 charcters"],
    },
    photo: {
      type: Object,
      required: [true, "Please Add a Photo"],
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fanonymous-avatar&psig=AOvVaw1mQ4YNiQRQy-OMfgEn9cIW&ust=1682668503104000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPC99OTKyf4CFQAAAAAdAAAAABAE",
    },
    phone: {
      type: String,
      default: "1234",
    },
    bio: {
      type: String,
      required: [true, "Please enter your bio"],
      minLength: [2, "Biomust be ast least 10 character long"],
      default: "bio",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const Salt = await bcrypt.genSalt(10);
  const hashedpw = await bcrypt.hash(this.password, Salt);
  this.password = hashedpw;
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
