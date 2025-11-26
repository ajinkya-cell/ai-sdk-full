import { UIMessage } from "@ai-sdk/react"
import {streamText , convertToModelMessages} from "ai"
import {createOpenRouter} from '@openrouter/ai-sdk-provider'
import type { MyUIMessage } from "./types"

const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY
})

export async function POST(req:Request){
    try {
        const {messages}:{messages:MyUIMessage[]} = await req.json()
    const result = streamText({
         model: openrouter.chat('x-ai/grok-4.1-fast:free'),
         messages :convertToModelMessages(messages)
         
         
         // this function strips off ui metadata and gives off messages which will work for model
    })

    return result.toUIMessageStreamResponse({
        messageMetadata : ({part})=>{
            if(part.type === "start"){
                return {
                    createdAt:Date.now()
                }
            }
            if(part.type === "finish"){
                console.log(part.totalUsage)
                return {
                    totalTokens: part.totalUsage.totalTokens
                }
            }
        }
    })
    } catch (error) {
        console.error("Error streamig chat completion" , error)
        return new Response("Failed to stream chat completion" ,{status:500})
    }
}