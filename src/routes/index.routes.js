const { Router } = require("express");
const router = Router();

const {
  renderIndex,
  renderBlog,
  renderContact,
  sendEmail
} = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/blog", renderBlog);
router.get("/contact", renderContact);
router.post("/send-email", sendEmail);
module.exports = router;
