const Section = require("../models/sectionSchema");
const asyncHandler = require("express-async-handler");
const Idea = require("../models/ideaSchema");
const { findById, findByIdAndRemove } = require("../models/sectionSchema");
const path = require("path");
const Admin = require("../models/AdminSchema");
const getAllSections = asyncHandler(async (req, res) => {
  const sections = await Section.find({});
  res.json({
    sections,
  });
});

const addSection = asyncHandler(async (req, res) => {
  const { sectionName, sectionImage } = req.body;
  try {
    const AddedSection = await Section.create({
      sectionName,
      sectionImage,
    });
    res.json({
      msg: "Section Added",
      section: AddedSection,
    });
  } catch (err) {
    res.status(501).json({ msg: "error", desc: err.message });
  }
});

const getApprovedIdeas = asyncHandler(async (req, res) => {
  const approvedIdeas = await Idea.find({ isApproved: true });
  res.json({ approvedIdeas });
});

const getUnApprovedIdeas = asyncHandler(async (req, res) => {
  const unApprovedIdeas = await Idea.find({ isApproved: false }).sort(
    "-createdAt"
  );
  res.json({
    unApprovedIdeas,
  });
});

const approvalIdea = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const approvedIdea = await Idea.findByIdAndUpdate(id, {
    isApproved: true,
  });

  console.log("APPP", approvedIdea);

  const section = await Section.findById(approvedIdea.ideaSection);
  if (!section) {
    res.status(404).json({
      msg: "Section Not Found",
    });
  }
  await Section.findByIdAndUpdate(approvedIdea.ideaSection, {
    $push: {
      sectionIdeas: approvedIdea._id,
    },
  });
  res.json({
    msg: "Idea Approved",
  });
});

const deleteSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const DeletedSection = await Section.findById(id).populate("sectionIdeas");
  console.log(DeletedSection);
  if (DeletedSection.sectionImage) {
    const fs = require("fs");

    const imagePath = path.join(
      __dirname,
      `../public/${DeletedSection.sectionImage}`
    );
    console.log("PATH", imagePath);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      //file removed
    });
  }

  await Idea.deleteMany({
    ideaSection: id,
  });
  console.log("IDEAS", DeletedSection.sectionIdeas);
  DeletedSection.sectionIdeas.map((i) => {
    if (i.ideaImage) {
      const fs = require("fs");
      const imagePath = path.join(__dirname, `../public/${i.ideaImage}`);
      console.log("PATH", imagePath);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
      });
    }
  });

  await Section.findOneAndRemove({ _id: id });

  res.json({
    msg: "section Deleted",
  });

  //Remove Section Image from Files
});

const deleteIdea = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("DDDDDD");

  const deletedIdea = await Idea.findById(id);
  console.log("Deleted Idea", deletedIdea);
  if (deletedIdea.ideaImage) {
    const fs = require("fs");

    const imagePath = path.join(
      __dirname,
      `../public/${deletedIdea.ideaImage}`
    );
    console.log("PATH", imagePath);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      //file removed
    });
  }

  await Idea.findByIdAndRemove(id);

  const updatedSection = await Section.findByIdAndUpdate(
    deleteIdea.ideaSection,
    {
      $pull: {
        sectionIdeas: {
          _id: id,
        },
      },
    }
  );

  res.json({
    msg: "Idea Deleted",
    updatedSection,
  });
});

const adminLogin = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const admin = await Admin.findOne({ password: password });
  console.log(admin);
  if (admin) {
    res.status(200).json({
      state: true,
    });
  } else {
    res.status(301).json({
      state: false,
    });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const admin = await Admin.findOne({ password: oldPassword });
  if (!admin) {
    res
      .status(301)
      .json({ state: false, msg: "كلمة المرور القديمة غير صحيحة" });
  } else {
    const NewAdmin = await Admin.findByIdAndUpdate(admin._id, {
      password: newPassword,
    });
  }

  res.status(201).json({ state: true });
});

module.exports = {
  getAllSections,
  addSection,
  getApprovedIdeas,
  getUnApprovedIdeas,
  approvalIdea,
  deleteSection,
  deleteIdea,
  adminLogin,
  changePassword,
};
