const fs = require("fs");
const jwt = require("jsonwebtoken");

// private and public keys provided here
const privateKey = fs.readFileSync("./security/private.key", "utf8");
const publicKey = fs.readFileSync("./security/public.key", "utf8");

async function signIn(user) {
  const signInOptions = {
    issuer: user.email,
    subject: user.email,
    expiresIn: "12h",
    algorithm: "RS256"
  };

  const payload = {
    id: user.id,
    email: user.email
  };

  return await jwt.sign(payload, privateKey, signInOptions);
}

function guard(req, res, next) {
  const { authorization } = req.headers;

  if (typeof authorization !== "undefined") {
    const token = authorization.split(" ")[1];

    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        res.status(403).json({ error: true, message: "not authorized" });
      } else {
        req.body.user = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({ error: true, message: "not authorized" });
  }
}

module.exports = {
  signIn,
  guard
};
