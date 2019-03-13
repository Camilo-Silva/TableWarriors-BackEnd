const express = require("express");
const router = express.Router();
const CharacterModel = require("../models/Character");
const characterSeeder = require("../seeds/characters.json");

router.post("/", (req, res, next) => {
  const character = ({
    clan,
    nickname,
    apperance,
    refuge,
    background,
    weakness,
    stereotypes,
    disciplines
  } = req.body);

  CharacterModel.create(character, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    res.status(200).json(result);
  });
});

router.get("/characterSeeder", (req, res, next) => {
  CharacterModel.insertMany(characterSeeder, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    res.status(200).json(result);
  });
});

module.exports = router;
