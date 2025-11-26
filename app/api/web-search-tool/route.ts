
// import {createOpenRouter} from '@openrouter/ai-sdk-provider'
// import {
//   streamText,
//   UIMessage,
//   convertToModelMessages,
//   tool,
//   InferUITools,
//   UIDataTypes,
//   stepCountIs,
// } from "ai";

// import { z } from "zod";

// const openrouter = createOpenRouter({
//     apiKey: process.env.OPEN_ROUTER_API_KEY
// })


// const tools = {
//   web_search_preview:openrouter.tools.webSear
// };

// export type ChatTools = InferUITools<typeof tools>;
// export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

// export async function POST(req:Request){
//     try {
//         const {messages}:{messages:ChatMessage[]} = await req.json()
//     const result = streamText({
//          model: openrouter.chat('x-ai/grok-4.1-fast:free'),
//          messages :convertToModelMessages(messages),
//          tools,
//          stopWhen:stepCountIs(2)
//          // this function strips off ui metadata and gives off messages which will work for model
//     })

//     return result.toUIMessageStreamResponse()
//     } catch (error) {
//         console.error("Error streamig chat completion" , error)
//         return new Response("Failed to stream chat completion" ,{status:500})
//     }
// }