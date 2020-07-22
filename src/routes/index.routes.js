const { Router } = require("express");
const router = Router();

const { renderIndex, renderBlog } = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/blog", renderBlog);

module.exports = router;
