// import { Configuration, OpenAIApi } from "openai";

// // 🔐 OpenAI setup (key loaded from .env)
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(config);

// ✨ Generate poetry using OpenAI
export const generatePoem = async (req, res) => {
  const { topic, tone = "romantic", recipientName = "Someone" } = req.body;

  if (!topic) return res.status(400).json({ error: "Topic is required" });

  const prompt = `Write a short, ${tone} poem for ${recipientName} about ${topic}. Make it heartfelt and original.`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", // or use gpt-3.5-turbo-instruct
      prompt,
      max_tokens: 120,
      temperature: 0.9,
    });

    const poem = response.data.choices[0].text.trim();
    res.status(200).json({ poem });
  } catch (error) {
    console.error("Poetry generation failed:", error.message);
    res.status(500).json({ error: "Failed to generate poem" });
  }
};
