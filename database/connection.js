const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const database = mongoose.connection;

// events
database.on("error", console.error.bind(console, "MongoDB connectionb error."));
database.on("connected", () => {
  console.log("MongoDB has been connected.");
});
