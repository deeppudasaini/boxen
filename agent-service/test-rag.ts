import dotenv from 'dotenv';
import { Chunker } from './src/rag/chunker';
import { Embedder } from './src/rag/embedder';

dotenv.config();

async function testRag() {
  console.log('Testing RAG components...');

  // Test Chunker
  const chunker = new Chunker(100, 20);
  const text = 'This is a long text that needs to be split into smaller chunks. '.repeat(10);
  const chunks = await chunker.splitText(text);
  console.log(`Chunker produced ${chunks.length} chunks.`);
  console.log('First chunk:', chunks[0]);

  // Test Embedder
  if (process.env.OPENAI_API_KEY) {
    const embedder = new Embedder();
    const embeddings = await embedder.embedDocuments([chunks[0]]);
    console.log(`Generated embedding with dimension: ${embeddings[0].length}`);
  } else {
    console.log('Skipping Embedder test: OPENAI_API_KEY not found.');
  }
}

testRag().catch(console.error);
