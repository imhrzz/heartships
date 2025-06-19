import Gift from "../models/Gift.js";

export const getGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gifts" });
  }
};
