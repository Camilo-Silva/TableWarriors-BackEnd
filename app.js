const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("./database/connection");

const vtmRouter = require("./routes/vtm-routes");
const vtmSeederRouter = require("./routes/vtm-seeder-routes");
const usersRouter = require("./routes/users-routes");
const apiPrefix = "/apis";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(`${apiPrefix}/vtm`, vtmRouter);
app.use(`${apiPrefix}/vtm/seeders`, vtmSeederRouter);
app.use(`${apiPrefix}/auth`, usersRouter);
app.use((err, req, res, next) => {
  res.status(500);
  res.json(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
