import { experimental_transcribe as transcribe } from "ai";
import {createOpenRouter} from '@openrouter/ai-sdk-provider'

const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY
})


export async function POST(req:Request){
    try {
        const formData = await req.formData()
    const audioFile = formData.get("audio") as File

    if(!audioFile){
        return new Response("No audio file provided" , {status: 400})
    }

    const arrayBuffer = await audioFile.arrayBuffer()
    const unit8Array = new Uint8Array(arrayBuffer)
    const transcript = "This model doesnt work for transcribing audio"

    // const transcript = await transcribe({
        // model: openrouter.chat('x-ai/grok-4.1-fast:free'),
    //     audio:unit8Array
    // })

    return Response.json(transcript)
    } catch (error) {
        console.error("Error transcribing audio :" , error);
        return new Response("Failed to transcribe audio"  , {status : 500})
    }
}