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

router.get("/uniforms", renderUniforms);

// Create/add Uniform
router.get("/uniforms/add", renderUniformForm);
router.post(
  "/uniforms/add",
  uploadUniform.single("img_file_uniform"),
  createNewUniform
);

// Update/edit uniform
router.get("/uniforms/edit/:id", renderEditUniformsForm);
router.put(
  "/uniforms/edit/:id",
  uploadUniform.single("img_file_uniform"),
  updateUniform
);

router.delete("/uniforms/delete/:id", deleteUniform);

module.exports = router;
