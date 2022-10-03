const Section = require("../models/sectionSchema");
const asyncHandler = require("express-async-handler");

const getAllSections = asyncHandler(async (req, res) => {
  const sections = await Section.find({}).sort("-createdAt");
  res.status(200).json({
    sections: sections,
  });
});
const getSingleSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const section = await Section.findById(id).populate("sectionIdeas");
  if (section) {
    res.status(200).json({
      section: section,
    });
  }
  res.status(404).json({
    msg: "No Section Found",
  });
});
module.exports = {
  getAllSections,
  getSingleSection,
};
