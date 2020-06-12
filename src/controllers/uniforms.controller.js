const uniformsCtrl = {};
const Uniform = require("../models/Uniform");
const Category = require("../models/Category");

uniformsCtrl.renderUniforms = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const uniforms = await Uniform.find().lean();
    res.render("uniforms/all-uniforms", { uniforms });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

uniformsCtrl.renderUniformForm = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render("uniforms/new-uniform", { categories });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

uniformsCtrl.createNewUniform = async (req, res) => {
  try {
    const { gender, date, form, season, limit_date, description } = req.body;
    if (req.file != undefined) {
      const name_file = req.file.originalname;
      var image = "/images/uniforms/" + name_file;
      const newUniform = new Uniform({
        image,
        description,
        gender,
        season,
        form,
        limit_date,
      });
      await newUniform.save();
    } else {
      const newUniform = new Uniform({
        gender,
        date,
        description,
        form,
        limit_date,
      });
      await newUniform.save();
    }
    req.flash("success_msg", "Uniforme agregado exitosamente!!");
    res.redirect("/uniforms");
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

uniformsCtrl.renderEditUniformsForm = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const uniform = await Uniform.findById(req.params.id).lean();
    res.render("uniforms/edit-uniform", { categories, uniform });
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

uniformsCtrl.updateUniform = async (req, res) => {
  try {
    const { gender, date, form, season, limit_date, description } = req.body;
    if (req.file != undefined) {
      const name_file = req.file.originalname;
      var image = "/images/uniforms/" + name_file;
      await Uniform.findByIdAndUpdate(req.params.id, {
        gender,
        date,
        form,
        season,
        limit_date,
        description,
        image,
      });
    } else {
      await Uniform.findByIdAndUpdate(req.params.id, {
        gender,
        date,
        form,
        season,
        limit_date,
        description,
      });
    }
    req.flash("success_msg", "Uniforme editado exitosamente!!");
    res.redirect("/uniforms");
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

uniformsCtrl.deleteUniform = async (req, res) => {
  try {
    await Uniform.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Uniforme eliminado exitosamente!!");
    res.redirect("/uniforms");
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

module.exports = uniformsCtrl;
