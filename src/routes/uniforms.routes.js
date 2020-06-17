const multer = require("multer");
const storageUniform = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/uniforms/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadUniform = multer({ storage: storageUniform });

const { Router } = require("express");
const router = Router();

const {
  renderUniforms,
  renderUniformForm,
  createNewUniform,
  renderEditUniformsForm,
  updateUniform,
  deleteUniform,
} = require("../controllers/uniforms.controller");

const { isAutenticated } = require("../helpers/auth");

router.get("/uniforms", renderUniforms);

// Create/add Uniform
router.get("/uniforms/add", isAutenticated, renderUniformForm);
router.post(
  "/uniforms/add",
  isAutenticated,
  uploadUniform.single("img_file_uniform"),
  createNewUniform
);

// Update/edit uniform
router.get("/uniforms/edit/:id", isAutenticated, renderEditUniformsForm);
router.put(
  "/uniforms/edit/:id",
  isAutenticated,
  uploadUniform.single("img_file_uniform"),
  updateUniform
);

router.delete("/uniforms/delete/:id", isAutenticated, deleteUniform);

module.exports = router;
