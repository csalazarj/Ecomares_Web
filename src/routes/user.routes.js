const { Router } = require("express");
const router = Router();

const {
  renderSignUpForm,
  signUp,
  renderSignInForm,
  signIn,
  logout,
} = require("../controllers/users.controller");

const { isAutenticated } = require("../helpers/auth");

// Register user
router.get("/user/signup", renderSignUpForm);
router.post("/user/signup", signUp);

// Login user
router.get("/user/signin", renderSignInForm);
router.post("/user/signin", signIn);

// Logout
router.get("/user/logout", isAutenticated, logout);

module.exports = router;