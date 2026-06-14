import OpenAI from "openai";
import { config } from "./config";

let client: OpenAI | null = null;

/** OpenAI client — only used when EMBEDDING_PROVIDER=openai. */
export function getOpenAI(): OpenAI {
  if (!config.openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not set.");
  }
  if (!client) {
    client = new OpenAI({ apiKey: config.openaiApiKey });
  }
  return client;
}
