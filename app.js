const createError = require("http-errors");
const express = require("express");
const Fingerprint = require("express-fingerprint");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const reqIpMiddleware = require("./middlewares/ip");
var cloudflare = require("cloudflare-express");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.set("trust proxy", true);
app.use(cloudflare.restore());
app.use(reqIpMiddleware);

app.use(
  Fingerprint({
    parameters: [
      // Defaults
      Fingerprint.useragent,
      Fingerprint.acceptHeaders,
      Fingerprint.geoip,

      // Additional parameters
      function (next) {
        // ...do something...
        next(null, {
          param1: "value1",
        });
      },
      function (next) {
        // ...do something...
        next(null, {
          param2: "value2",
        });
      },
    ],
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
