const memberCtrl = {};
const Member = require("../models/Member");
const Category = require("../models/Category");

memberCtrl.renderMembers = async (req, res) => {
  try {
    const members = await Member.find().lean();
    res.render("members/all-members", { members });
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};


memberCtrl.renderMembersForm = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render("members/new-member", { categories });
  } catch (error) {
    res.send({ status: "ERROR", message: "hola errror" });
  }
};

memberCtrl.createNewMember = async (req, res) => {
  try {
    const {
      name,
      number,
      id_card,
      birthdate,
      alias,
      positions,
      archievements,
      role,
      current_category,
    } = req.body;
    if (req.file != undefined) {
      const name_file = req.file.originalname;
      var image = "/images/members/" + name_file;
      const newMember = new Member({
        name,
        number,
        id_card,
        birthdate,
        alias,
        positions,
        archievements,
        role,
        current_category,
        image,
      });
      await newMember.save();
    } else {
      const newMember = new Member({
        name,
        number,
        id_card,
        birthdate,
        alias,
        positions,
        archievements,
        role,
        current_category,
      });
      await newMember.save();
    }
    req.flash("success_msg", "Miembro agregado exitosamente!!");
    res.redirect("/members");
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

memberCtrl.renderEditMembersForm = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const member = await Member.findById(req.params.id).lean();
    res.render("members/edit-member", { categories, member });
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

memberCtrl.updateMember = async (req, res) => {
  try {
    const {
      name,
      id_card,
      birthdate,
      alias,
      positions,
      archievements,
      role,
      current_category,
    } = req.body;
    if (req.file != undefined) {
      const name_file = req.file.originalname;
      var image = "/images/members/" + name_file;
      await Member.findByIdAndUpdate(req.params.id, {
        name,
        id_card,
        birthdate,
        alias,
        positions,
        archievements,
        role,
        current_category,
        image,
      });
    } else {
      await Member.findByIdAndUpdate(req.params.id, {
        name,
        id_card,
        birthdate,
        alias,
        positions,
        archievements,
        role,
        current_category,
      });
    }
    req.flash("success_msg", "Miembro editado exitosamente!!");
    res.redirect("/members");
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
};

memberCtrl.deleteMember = async(req, res)=>{
  try {
    await Member.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Miembro eliminado exitosamente!!");
    res.redirect("/members");
  } catch (error) {
    res.send({ status: "ERROR", message: error.message });
  }
}

module.exports = memberCtrl;
