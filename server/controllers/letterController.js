import Letter from "../models/Letter.js";

// ✍️ Create a new letter
export const createLetter = async (req, res) => {
  const { userId, recipientName, content, handwritingStyle } = req.body;

  try {
    const newLetter = new Letter({
      userId,
      recipientName,
      content,
      handwritingStyle,
    });

    await newLetter.save();
    res.status(201).json(newLetter);
  } catch (error) {
    console.error("Error creating letter:", error);
    res.status(500).json({ error: "Failed to create letter" });
  }
};

// 📩 Get all letters for a specific user
export const getLettersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const letters = await Letter.find({ userId }).sort({ createdAt: -1 });
    res.json(letters);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch letters" });
  }
};

// 📄 Get a specific letter by ID
export const getLetterById = async (req, res) => {
  const { letterId } = req.params;

  try {
    const letter = await Letter.findById(letterId);
    if (!letter) return res.status(404).json({ error: "Letter not found" });

    res.json(letter);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve letter" });
  }
};

// ❌ Delete a letter
export const deleteLetter = async (req, res) => {
  const { letterId } = req.params;

  try {
    const deleted = await Letter.findByIdAndDelete(letterId);
    if (!deleted) return res.status(404).json({ error: "Letter not found" });

    res.json({ message: "Letter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete letter" });
  }
};
