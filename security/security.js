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
    email: user.email
  };

  return await jwt.sign(payload, privateKey, signInOptions);
}

async function verify(token) {
  try {
    const sanitizedToken = token.split(" ")[1];
    return await jwt.verify(sanitizedToken, publicKey);
  } catch (err) {
    return { error: true, message: "invalid token" };
  }
}

module.exports = {
  signIn,
  verify
};
