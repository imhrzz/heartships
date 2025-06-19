import mongoose from "mongoose";

const letterSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    handwritingStyle: {
      type: String,
      default: "classic",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Letter", letterSchema);
