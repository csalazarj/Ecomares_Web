const express = require("express");
const Handlebars = require('handlebars')
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Initializations
const app = express();
require("./config/passport");

//Settings
app.set("port", process.env.PORT || 3002);
app.set("views", path.join(__dirname + "/views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      if_equal: function (a, b, opts) {
        if (a == b) {
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      },
    },
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/categories.routes"));
app.use(require("./routes/user.routes"));
app.use(require("./routes/member.routes"));
app.use(require("./routes/uniforms.routes"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
