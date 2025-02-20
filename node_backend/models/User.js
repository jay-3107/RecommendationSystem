const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  uuid: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  preferences: { type: Object, default: {} }, // Add this line
});

module.exports = mongoose.model("User", UserSchema, "users");