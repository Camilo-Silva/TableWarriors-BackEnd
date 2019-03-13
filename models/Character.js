const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CharacterModelSchema = new Schema({
  clan: String,
  nickname: String,
  apperance: String,
  refuge: String,
  background: String,
  weakness: String,
  stereotypes: String,
  disciplines: []
});

module.exports = mongoose.model("CharacterModel", CharacterModelSchema);
