const { Router } = require("express");
const router = Router();

const {
  renderSignUpForm,
  signUp,
  renderSignInForm,
  signIn,
  logout,
} = require("../controllers/admin.controller");

const { isAutenticated } = require("../helpers/auth");

// Register admin
router.get("/admin/signup", isAutenticated, renderSignUpForm);
router.post("/admin/signup", isAutenticated, signUp);

// Login admin
router.get("/admin/signin", renderSignInForm);
router.post("/admin/signin", signIn);

// Logout
router.get("/admin/logout", isAutenticated, logout);

module.exports = router;