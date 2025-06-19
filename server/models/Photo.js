import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    originalName: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Photo", photoSchema);
