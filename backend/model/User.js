const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  gender:   String,
  dateofbirth: Date,
  profileImage: String,
  coverPhoto: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followerCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
