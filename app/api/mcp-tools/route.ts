
import {createOpenRouter} from '@openrouter/ai-sdk-provider'
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  InferUITools,
  UIDataTypes,
  stepCountIs,
  
} from "ai";
import { experimental_createMCPClient as createMCPClient } from '@ai-sdk/mcp';

import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

import { z } from "zod";
import { error } from 'console';

const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY
})


const tools = {
  getWeather: tool({
    description: "Get the weather for a location",
    inputSchema: z.object({
      city: z.string().describe("The city to get the weather for"),
    }),
    execute: async ({ city }) => {
      if (city === "Gotham City") {
        return "70°F and cloudy";
      } else if (city === "Metropolis") {
        return "80°F and sunny";
      } else {
        return "Unknown";
      }
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req:Request){
    try {
        const {messages}:{messages:ChatMessage[]} = await req.json()

        const httpTransport = new StreamableHTTPClientTransport(
            new URL("https://app.mockmcp.com/servers/fNIs-aallt0p/mcp"),
            {
                requestInit:{
                    headers:{
                        Authorization:"Bearer mcp_m2m_NwKsiHF_wiB73dL7M9_VeONVovRkNzsHceXKtFIyf5U_1f79cc9c3c5cbcc1"
                    }
                }
            }
        );

        const mcpClient = await createMCPClient({
            transport : httpTransport
        })

        const mcpTools = await mcpClient.tools()
    const result = streamText({
         model: openrouter.chat('x-ai/grok-4.1-fast:free'),
         messages :convertToModelMessages(messages),
         tools:{...mcpTools , ...tools},
         stopWhen:stepCountIs(2),
         onFinish: async()=>{
          await  mcpClient.close()
         },
         onError: async()=>{
            await mcpClient.close()
            console.error("Error during streaming" , error)
         }
         // this function strips off ui metadata and gives off messages which will work for model
    })

    return result.toUIMessageStreamResponse()
    } catch (error) {
        console.error("Error streamig chat completion" , error)
        return new Response("Failed to stream chat completion" ,{status:500})
    }
}