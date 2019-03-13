const mongoose = require("mongoose");
const config = require("../config/connection.json");

mongoose.connect(config.url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const database = mongoose.connection;

// events
database.on("error", console.error.bind(console, "MongoDB connectionb error."));
database.on("connected", () => {
  console.log("MongoDB has been connected.");
});
