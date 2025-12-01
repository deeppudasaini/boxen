import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import axios from 'axios';
import { Embedder } from '../rag/embedder';

export interface ChatResponse {
  answer: string;
  citations: any[];
}

export class RagAgent {
  private llm: ChatGoogleGenerativeAI;
  private embedder: Embedder;
  private apiBaseUrl: string;

  constructor() {
    this.llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY!,
      model: 'gemini-2.0-flash-exp',
      temperature: 0,
    });
    this.embedder = new Embedder();
    this.apiBaseUrl = process.env.PORTAL_BACKEND_URL || 'http://localhost:3000';
  }

  async chat(query: string, userId: string): Promise<ChatResponse> {
    try {
      console.log(`Processing chat query for user ${userId}: ${query}`);

      // 1. Generate embedding for query
      const queryEmbedding = await this.embedder.embedQuery(query);

      // 2. Search for relevant chunks
      const searchResponse = await axios.post(
        `${this.apiBaseUrl}/rag/search`,
        {
          embedding: queryEmbedding,
          limit: 5,
          threshold: 0.7,
        },
        {
          headers: { 'Content-Type': 'application/json' } 
        }
      );

      const chunks = searchResponse.data;
      const context = chunks.map((c: any) => c.chunkContent).join('\n\n');

      // 3. Construct prompt
      const template = `You are Boxen AI, an intelligent email assistant.
Answer the user's question based ONLY on thrae following context from their emails.
If the answer is not in the context, say "I couldn't find that information in your emails."
Do not make up information.

Context:
{context}

User Question: {question}

Answer:`;

      const prompt = PromptTemplate.fromTemplate(template);

      // 4. Call LLM
      const chain = RunnableSequence.from([
        prompt,
        this.llm,
        new StringOutputParser(),
      ]);

      const answer = await chain.invoke({
        context,
        question: query,
      });

      return {
        answer,
        citations: chunks.map((c: any) => ({
          emailId: c.emailId,
          score: c.similarity,
          metadata: c.metadata,
        })),
      };

    } catch (error) {
      console.error('Error in RagAgent chat:', error);
      throw error;
    }
  }
}
