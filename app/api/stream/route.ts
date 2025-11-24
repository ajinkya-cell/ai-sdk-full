import {streamText } from "ai"
import {createOpenRouter} from '@openrouter/ai-sdk-provider'

const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY
})

export async function POST(req:Request){
  try {
      const { prompt } = await req.json();
    const result = streamText({
         model: openrouter.chat('x-ai/grok-4.1-fast:free'),
         prompt,
    })
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming text:" , error)
    return new  Response( "failed to stream text", { status:500})
  }
}