const adminCtrl = {};
const passport = require("passport");
const Admin = require("../models/Admin");

adminCtrl.renderSignUpForm = async (req, res) => {
  res.render("admin/signup");
};

adminCtrl.signUp = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length < 5) {
    errors.push({ text: "La contraseña debe ser de minimo 5 caracteres" });
  }
  if (errors.length > 0) {
    res.render("admin/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const emailAdmin = await Admin.findOne({ email: email });

    if (emailAdmin) {
      req.flash("error_msg", "Correo ya registrado previamente");
      res.redirect("/admin/signup");
    } else {
      const newAdmin = new Admin({ name, email, password });
      newAdmin.password = await newAdmin.encryptPassword(password);
      await newAdmin.save();
      req.flash("success_msg", "Registro de Admin exitoso, Bienvenido!!");
      res.redirect("/admin/signin");
    }
  }
};

adminCtrl.renderSignInForm = async (req, res) => {
  res.render("admin/signin");
};

adminCtrl.signIn = passport.authenticate("local", {
  failureRedirect: "/admin/signin",
  successRedirect: "/",
  failureFlash: true,
});

adminCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Sesión Cerrada Exitosamente");
  res.redirect("/");
};

module.exports = adminCtrl;