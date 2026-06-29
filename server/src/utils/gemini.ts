import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { env } from "./env";

// Chat Model Instance
export const chatModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.3,
  apiKey: env.GEMINI_API_KEY,
});

// Embeddings Instance
export const embeddingsModel = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
  apiKey: env.GEMINI_API_KEY,
});