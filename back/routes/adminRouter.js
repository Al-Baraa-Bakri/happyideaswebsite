const express = require("express");
const router = express.Router();
const {
  addSection,
  getAllSections,
  getApprovedIdeas,
  getUnApprovedIdeas,
  approvalIdea,
  deleteSection,
  deleteIdea,
  adminLogin,
  changePassword,
} = require("../controller/adminController");
router.route("/section").post(addSection).get(getAllSections);

router.route("/section/:id").delete(deleteSection);
router.route("/idea/:id").delete(deleteIdea);

router.route("/approved").get(getApprovedIdeas);
router.route("/unapproved").get(getUnApprovedIdeas);
router.route("/approval/:id").get(approvalIdea);

router.route("/login").post(adminLogin);
router.route("/login/change").post(changePassword);
module.exports = router;
