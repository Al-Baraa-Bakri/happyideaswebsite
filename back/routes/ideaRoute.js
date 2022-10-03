const express = require("express");
const router = express.Router();
const { addIdea, getAllIdeas } = require("../controller/ideaController");
router.route("/").get(getAllIdeas).post(addIdea);

module.exports = router;
