import { generateObject } from "ai";
import {createOpenRouter} from '@openrouter/ai-sdk-provider'

const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY
})

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const result = await generateObject({
      model: openrouter.chat('x-ai/grok-4.1-fast:free'),// gpt-5-mini supports enum better
      output: "enum",
      enum: ["positive", "negative", "neutral"],
      prompt: `Classify the sentiment in this text: "${text}"`,
    });

    return result.toJsonResponse();
  } catch (error) {
    console.error("Error generating sentiment:", error);
    return new Response("Failed to generate sentiment", { status: 500 });
  }
}