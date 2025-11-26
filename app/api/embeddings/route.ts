import { embed , embedMany } from "ai";
import { createMistral } from "@ai-sdk/mistral";

const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY
});


export async function POST(req:Request) {
    const body = await req.json()

    if(Array.isArray(body.texts)){
         const {values , embeddings , usage} = await embedMany({
    model: mistral.textEmbeddingModel("mistral-embed"),
    values: body.texts,
  });

  return Response.json({
    values,
    embeddings,
    usage,
    count:embeddings.length,
    dimensions:embeddings[0].length
  })
    }

  const {value , embedding , usage} = await embed({
    model: mistral.embedding("mistral-embed"),
    value: body.text
  });

  return Response.json({ value,
    embedding,
    usage,
    dimensions:embedding.length
   });
}
