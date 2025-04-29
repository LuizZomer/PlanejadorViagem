import OpenAI from 'openai';

export const openAi = new OpenAI({
  apiKey: process.env.openAiKey,
});
