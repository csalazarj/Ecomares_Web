const categoriesCtrl = {};
const Category = require("../models/Category");
const Member = require("../models/Member");

categoriesCtrl.renderCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render("categories/all-categories-2", { categories });
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

categoriesCtrl.renderOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).lean();
    const categories = await Category.find().lean();
    const members = await Member.find({
      current_category: category.name,
    }).lean();

    res.render("categories/one-category-2", { category, categories, members });
    console.log(members);
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

// Create categories
categoriesCtrl.renderCategoriesForm = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render("categories/new-category", { categories });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

categoriesCtrl.createNewCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (req.file != undefined) {
      const name_file = req.file.originalname;
      var images = "/images/categories/" + name_file;
      const newCategory = new Category({ name, description, images });
      await newCategory.save();
    } else {
      const newCategory = new Category({ name, description });
      await newCategory.save();
    }
    req.flash("success_msg", "Categoria agregado exitosamente!!");
    res.redirect("/categories");
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

// Update categories
categoriesCtrl.renderEditCategoryForm = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const category = await Category.findById(req.params._id).lean();
    res.render("categories/edit-category", { category, categories });
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

categoriesCtrl.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (req.file != undefined) {
      const name_file = req.file.originalname;
      var images = "/images/categories/" + name_file;
      await Category.findByIdAndUpdate(req.params._id, {
        name,
        description,
        images,
      });
    } else {
      await Category.findByIdAndUpdate(req.params._id, {
        name,
        description,
      });
    }
    req.flash("success_msg", "Categoria editada exitosamente!!");
    res.redirect("/categories");
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

//Delete categories
categoriesCtrl.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Categoria eliminada exitosamente!!");
    res.redirect("/categories");
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

module.exports = categoriesCtrl;
