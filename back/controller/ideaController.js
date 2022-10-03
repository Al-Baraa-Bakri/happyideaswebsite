const Section = require("../models/sectionSchema");
const asyncHandler = require("express-async-handler");
const Idea = require("../models/ideaSchema");
const getAllIdeas = asyncHandler(async (req, res) => {
  const ideas = await Idea.find({ isApproved: true }).sort("-createdAt");
  res.status(200).json(ideas);
});

const addIdea = asyncHandler(async (req, res) => {
  const { ideaDesc, ideaSection, ideaImage } = req.body;
  console.log(req.body);
  const AddedIdea = await Idea.create({
    ideaDesc,
    ideaSection,
    ideaImage,
  });
  if (!ideaSection) {
    res.status(501).json({
      msg: "Missing section",
    });
    return;
  }
  const section = await Section.findById(ideaSection);
  if (!section) {
    res.status(404).json({
      msg: "Section Not Found",
    });
    return;
  }
  console.log("DONE");
  res.status(201).json({
    AddedIdea,
  });
});
module.exports = {
  addIdea,
  getAllIdeas,
};
