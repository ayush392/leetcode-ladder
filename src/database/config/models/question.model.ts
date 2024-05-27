import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  contest: {
    title: String,
    titleSlug: String,
    type: {
      type: String,
      enum: ["Weekly", "Biweekly"],
    },
  },
  title: {
    type: String,
    required: true,
  },
  titleSlug: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  credit: {
    type: Number,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
});

const questionModel =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default questionModel;
