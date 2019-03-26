const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModelSchema = new Schema({
  email: String,
  password: String
});

module.exports = mongoose.model("UserModel", UserModelSchema);
