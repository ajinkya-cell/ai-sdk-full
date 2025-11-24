import {streamObject} from "ai"
import {createOpenRouter} from '@openrouter/ai-sdk-provider'
import { recipeSchema } from "./schema"

const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY
})


export async function POST(req:Request){
try {
        const { dish } = await req.json()
    const result = streamObject({
        model: openrouter.chat('x-ai/grok-4.1-fast:free'),
        schema : recipeSchema,
        prompt : `Generate a recipe for ${dish}`
    })

    return result.toTextStreamResponse()
} catch (error) {
    console.error("Error generating the recipe :" , error);
    return new Response("Failed to generate recipe" , {status:500})
}

}