const express = require("express");
const router = express.Router();
const CharacterModel = require("../models/Character");
const routerPrefix = "/characters";

/**
 * routes
 * ------
 *
 * GET apis/vtm/characters/
 * GET apis/vtm/characters/{id}
 * GET apis/vtm/characters/clan/{clan}
 */
router.get(`${routerPrefix}/`, (req, res, next) => {
  CharacterModel.find().exec((err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    res.status(200).json(result);
  });
});

router.get(`${routerPrefix}/:id`, (req, res, next) => {
  const { id } = req.params;
  CharacterModel.findById(id).exec((err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    res.status(200).json(result);
  });
});

router.get(`${routerPrefix}/clan/:clan`, (req, res, next) => {
  const { clan } = req.params;
  CharacterModel.findOne({ clan: clan }).exec((err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    res.status(200).json(result);
  });
});

module.exports = router;
