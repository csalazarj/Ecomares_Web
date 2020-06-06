const multer = require("multer");
const storageMember = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/members/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadMember = multer({ storage: storageMember });

const { Router } = require("express");
const router = Router();

const {
  renderMembers,
  renderMembersForm,
  createNewMember,
  renderEditMembersForm,
  updateMember,
  deleteMember
} = require("../controllers/member.controller");

// render Members
router.get("/members", renderMembers);

// Create/add Member
router.get("/members/add", renderMembersForm);
router.post(
  "/members/add",
  uploadMember.single("img_file_member"),
  createNewMember
);

// Update/Edit Member
router.get("/members/edit/:id", renderEditMembersForm);
router.put(
  "/members/edit/:id",
  uploadMember.single("img_file_member"),
  updateMember
);

// Delete Member
router.delete("/members/delete/:id", deleteMember)

module.exports = router;
