const mongoose = require("mongoose");

const ideaSchema = mongoose.Schema(
  {
    ideaName: {
      type: String,
      trim: true,
      default: "غير مخصص",
    },
    ideaDesc: {
      type: String,
      trim: true,
      default: "شاهد أفكار القسم وشاركنا أفكارك",
    },
    ideaSection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
    ideaImage: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Idea = mongoose.model("Idea", ideaSchema);
module.exports = Idea;
