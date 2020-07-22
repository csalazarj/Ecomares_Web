const indexCtrl = {};
const Category = require("../models/Category")

indexCtrl.renderIndex = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render("index", { categories });
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

indexCtrl.renderBlog = async (req, res) =>{
  try{
    const categories = await Category.find().lean();
    res.render("blog", { categories });

  } catch(error){
    res.send({ status: "ERROR", message: error.message });
  }
}

module.exports = indexCtrl;
