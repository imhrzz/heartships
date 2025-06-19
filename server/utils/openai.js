import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const generatePoetry = async (prompt) => {
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt,
    max_tokens: 150,
  });

  return response.data.choices[0].text;
};
