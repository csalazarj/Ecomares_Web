const multer = require("multer");
const storageCategory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/categories/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadCategory = multer({ storage: storageCategory });

const { Router } = require("express");
const router = Router();

const {
  renderCategories,
  renderCategoriesForm,
  createNewCategory,
  renderEditCategoryForm,
  updateCategory,
  deleteCategory,
  renderOneCategory
} = require("../controllers/categories.controller");

// render Categories
router.get("/categories", renderCategories);
router.get("/categories/c/:id", renderOneCategory);


// Create/add categories
router.get("/categories/add", renderCategoriesForm);
router.post(
  "/categories/add",
  uploadCategory.single("img_file_category"),
  createNewCategory
);

// Update/Edit categories
router.get("/categories/edit/:_id", renderEditCategoryForm);
router.put(
  "/categories/edit/:_id",
  uploadCategory.single("img_file_category"),
  updateCategory
);

// Delete category
router.delete("/categories/delete/:id", deleteCategory);
module.exports = router;


