const express = require("express");
const router = express.Router();
const {
  getAllSections,
  getSingleSection,
} = require("../controller/sectionController");
router.route("/").get(getAllSections);
router.route("/:id").get(getSingleSection);

module.exports = router;
