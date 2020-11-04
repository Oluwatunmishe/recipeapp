const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  username: { type: String },
  join: { type: Date, Default: Date.now() },
});
module.exports = mongoose.model("User", User);

