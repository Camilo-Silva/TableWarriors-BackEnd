const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const security = require("../security/security");
const routerPrefix = "/users";
const saltRounds = 10;

router.post(`${routerPrefix}/`, (req, res, next) => {
  const user = ({ email, password } = req.body);
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next({ error: err });

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next({ error: err });

      user.password = hash;

      UserModel.create(user, (err, result) => {
        if (err) return next({ error: err });

        res.status(200).json(result);
      });
    });
  });
});

router.post(`${routerPrefix}/login`, (req, res, next) => {
  const user = ({ email, password } = req.body);
  UserModel.findOne({ email: user.email }).exec((err, userFound) => {
    if (err) return next({ error: err });
    if (!userFound)
      return next({
        error: "invalid login: email not found or password not match."
      });

    bcrypt.compare(user.password, userFound.password, (err, result) => {
      if (!result)
        return next({
          error: "invalid login: email not found or password not match."
        });

      security.signIn(userFound).then(token => {
        try {
          req.body.user = userFound;
          res.status(200).json({ token: token });
        } catch (err) {
          return next({ error: err });
        }
      });
    });
  });
});

router.put(`${routerPrefix}/update`, security.guard, (req, res, next) => {
  const { user } = req.body;
  const update = ({ email, password } = req.body);

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next({ error: err });

    bcrypt.hash(update.password, salt, (err, hash) => {
      if (err) return next({ error: err });

      update.password = hash;

      UserModel.updateOne({ _id: user.id }, { $set: update }, (err, result) => {
        if (err) return next({ error: err });
        res.status(200).json(result);
      });
    });
  });
});

router.delete(`${routerPrefix}/delete`, security.guard, (req, res, next) => {
  const { user } = req.body;

  UserModel.deleteOne({ _id: user.id }, (err, result) => {
    if (err) return next({ error: err });
    res.status(200).json(result);
  });
});

module.exports = router;
