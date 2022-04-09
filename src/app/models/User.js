const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // _id: {
    //   unique: true,
    // },
    name: {
      type: String,
      maxLength: 255,
      minLength: 6,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      min: 1,
      max: 120,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
      minLength: 4,
      maxLength: 100,
    },
    avatar: {
      type: String,
    },
    favorite: {
      type: Array,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
