const express = require("express");
const fileSystem = require("fs");
const router = express.Router();
const CharacterModel = require("../models/Character");
const characterSeeder = require("../seeds/characters.json");

// shared functions
function populateCharacter(content) {
  const character = ({
    clan,
    nickname,
    apperance,
    refuge,
    background,
    weakness,
    stereotypes,
    disciplines
  } = content);
  const characterImageUrl = content.characterImageUrl;

  // prepare the image based in the static folder path
  character.characterImage = {};
  character.characterImage.data = fileSystem.readFileSync(characterImageUrl);
  character.characterImage.contentType = "image/jpg";

  return character;
}

// routes themselves
router.post("/", (req, res, next) => {
  const character = populateCharacter(req.body);

  CharacterModel.create(character, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    res.status(200).json(result);
  });
});

router.get("/characterSeeder", (req, res, next) => {
  let characters = [];

  characterSeeder.forEach(element => {
    let character = populateCharacter(element);
    characters.push(character);
  });

  CharacterModel.insertMany(characters, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    res.status(200).json(result);
  });
});

router.get("/cleanCharacterDatabase", (req, res, next) => {
  CharacterModel.remove({}, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    res.status(200).json(result);
  });
});

router.get("/characterImage", (req, res, next) => {
  CharacterModel.findOne({ clan: "Brujah" }).exec((err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    res.contentType(result.characterImage.contentType);
    res.status(200).send(result.characterImage.data);
  });
});

module.exports = router;
