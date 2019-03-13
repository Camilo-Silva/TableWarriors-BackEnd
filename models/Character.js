const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CharacterModelSchema = new Schema({
  clan: String,
  description: String,
  nickname: String,
  apperance: String,
  refuge: String,
  background: String,
  weakness: String,
  organization: String,
  stereotypes: [],
  disciplines: []
});

module.exports = mongoose.model("CharacterModel", CharacterModelSchema);
