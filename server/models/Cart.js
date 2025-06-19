import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      gift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gift",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
