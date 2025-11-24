import {generateText} from "ai"
import {createOpenRouter} from '@openrouter/ai-sdk-provider'

const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY
})

export async function POST(req: Request){

    try {
   const {prompt } =  await req.json();
   const {text} = await generateText({
    model: openrouter.chat('x-ai/grok-4.1-fast:free'),
    prompt,
});

return Response.json({text})
    } catch (error) {
       console.error("Error generating the text" , error) 
       return Response.json({error:"Failed to generate text"})
    }

}