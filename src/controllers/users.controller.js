const userCtrl = {};
const passport = require("passport");
const User = require("../models/User");

userCtrl.renderSignUpForm = async (req, res) => {
  const user = await res.locals.user;
  res.render("user/signup", {user});
  console.log('user', user)
};

userCtrl.signUp = async (req, res) => {
  const errors = [];
  const { name, role, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length < 5) {
    errors.push({ text: "La contraseña debe ser de minimo 5 caracteres" });
  }
  if (errors.length > 0) {
    res.render("user/signup", {
      errors,
      name,
      role,
      email,
      password,
      confirm_password,
    });
  } else {
    const emailUser = await User.findOne({ email: email });

    if (emailUser) {
      req.flash("error_msg", "Correo ya registrado previamente");
      res.redirect("/user/signup");
    } else {
      const newUser = new User({ name, role, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registro de Usuario exitoso, Bienvenido!!");
      res.redirect("/user/signin");
    }
  }
};

userCtrl.renderSignInForm = async (req, res) => {
  res.render("user/signin");
};

userCtrl.signIn = passport.authenticate("local", {
  failureRedirect: "/user/signin",
  successRedirect: "/",
  failureFlash: true,
});

userCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Sesión Cerrada Exitosamente");
  res.redirect("/");
};

module.exports = userCtrl;
