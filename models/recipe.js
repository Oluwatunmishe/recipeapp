const mongoose = require("mongoose");


const recipe = new mongoose.Schema({
  name: { type: String },
  ingredient: { type: String },
  author: { type: String },
  procedure: { type: String },
  description: { type: String },
  photo: { type: String },
  time:{type: date, default: Date.now}
});
module.exports = mongoose.model("recipe", recipe);
