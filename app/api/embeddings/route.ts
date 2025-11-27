import { embed , embedMany } from "ai";
import { createMistral } from "@ai-sdk/mistral";
import { NextResponse } from 'next/server';
import { count } from "console";


const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY
});


// export async function POST(req:Request) {
// const { embeddings } = await embedMany({
//   model: mistral.textEmbeddingModel('mistral-embed'),
//   values: [
//     'Text to embed 1',
//     'Text to embed 2',
//     'Text to embed 3',
    
//   ],
// });

// return embeddings;

//   const {value , embedding , usage} = await embed({
//     model: mistral.embedding("mistral-embed"),
//     value: body.text
//   });

//   return Response.json({ value,
//     embedding,
//     usage,
//     dimensions:embedding.length
//    });
// }

export async function POST(req: Request) {
  try {
    // Check if request has a body
    const body = await req.text();
    if (!body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    const { values } = JSON.parse(body);

    if (!values || !Array.isArray(values)) {
      return NextResponse.json(
        { error: 'values must be an array of strings' },
        { status: 400 }
      );
    }

    const { embeddings , usage } = await embedMany({
      model: mistral.textEmbeddingModel('mistral-embed'),
      maxParallelCalls:3,
      values,
    });

    return NextResponse.json({ 
      embeddings ,
       usage , 
      count:embeddings.length ,
      dimensions:embeddings[0].length
     });
    
  } catch (error) {
    console.error('Embedding error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate embeddings' },
      { status: 500 }
    );
  }
}
