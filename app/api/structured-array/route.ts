import {streamObject} from "ai"
import { pokemonSchema } from "./schema"
import {createOpenRouter} from '@openrouter/ai-sdk-provider'

const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY
})

export async function POST(req : Request){
    try {
        const {type} = await req.json()

        const result = streamObject({
            model: openrouter.chat('x-ai/grok-4.1-fast:free'), 
            output:"array",
            schema:pokemonSchema,
            prompt:`Generate a list of 5 ${type} pokemon`
        })
        return result.toTextStreamResponse()
    } catch (error) {
        console.error("Error generating pokemon:" , error)
        return new Response("Failed to generate pokemon " , {status:500})
    }
}