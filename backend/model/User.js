const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
    },
    email: { type: String, required: true, unique: true },
    gender: { type: String, default: null },
    dateofbirth: { type: Date, default: null },
    profilePicture: { type: String, default: null },
    coverPhoto: { type: String, default: null },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followerCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    bio: { type: mongoose.Schema.Types.ObjectId, ref: "Bio" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
