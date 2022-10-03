const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema(
  {
    sectionName: {
      type: String,
      trim: true,
      default: "غير مخصص",
    },
    sectionDesc: {
      type: String,
      trim: true,
      default: "شاهد أفكار القسم وشاركنا أفكارك",
    },
    sectionIdeas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea",
        default: [],
      },
    ],
    sectionImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Section = mongoose.model("Section", sectionSchema);
module.exports = Section;
