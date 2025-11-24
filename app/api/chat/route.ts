import { UIMessage } from "@ai-sdk/react"
import {streamText , convertToModelMessages} from "ai"
import {createOpenRouter} from '@openrouter/ai-sdk-provider'

const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY
})

export async function POST(req:Request){
    try {
        const {messages}:{messages:UIMessage[]} = await req.json()
    const result = streamText({
         model: openrouter.chat('x-ai/grok-4.1-fast:free'),
         messages :[
            {
                role:"system",
                content:"You are a friendly teacher who explain all the question with childlike examples."
            },
            ...convertToModelMessages(messages)
         ]
         
         
         // this function strips off ui metadata and gives off messages which will work for model
    })

    return result.toUIMessageStreamResponse()
    } catch (error) {
        console.error("Error streamig chat completion" , error)
        return new Response("Failed to stream chat completion" ,{status:500})
    }
}