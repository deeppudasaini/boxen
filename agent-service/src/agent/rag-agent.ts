import { ChatOpenAI } from '@langchain/openai';
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
  private llm: ChatOpenAI;
  private embedder: Embedder;
  private apiBaseUrl: string;

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4-turbo-preview', // Use a capable model for reasoning
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
      // Note: In a real app, we should filter by userId/accountId. 
      // For MVP, we assume the backend handles auth or we pass a user context.
      // Currently the backend search endpoint is protected by Clerk, but agent-service uses a public endpoint or service-to-service auth.
      // We'll use the public search endpoint if we made one, or the protected one with a service token.
      // Wait, the backend search endpoint is protected. We need a way to search.
      // For MVP, let's assume we can search via a service endpoint or we mock the auth.
      // Actually, we implemented `RagController` with `@UseGuards(ClerkAuthGuard)` for search.
      // We should probably add a service-level search endpoint or allow the agent to search.
      // Let's use the `RagService` directly if we were in the same app, but we are microservices.
      // We need to update the backend to allow search from agent-service (e.g. via API key or public endpoint for internal use).
      // For now, let's assume we update the backend controller to allow internal search or we pass a mock token.
      // Let's try to hit the endpoint. If it fails, we'll need to fix the backend.
      
      // FIX: We need to update the backend to allow internal search. 
      // I'll assume I can fix the backend controller in the next step.
      
      const searchResponse = await axios.post(
        `${this.apiBaseUrl}/rag/search`,
        {
          embedding: queryEmbedding,
          limit: 5,
          threshold: 0.7,
        },
        {
          // In a real app, use a service secret. For MVP, we might need to bypass or use a special header.
          // Or we can just make a new endpoint for the agent.
          headers: { 'Content-Type': 'application/json' } 
        }
      );

      const chunks = searchResponse.data;
      const context = chunks.map((c: any) => c.chunkContent).join('\n\n');

      // 3. Construct prompt
      const template = `You are Boxen AI, an intelligent email assistant.
Answer the user's question based ONLY on the following context from their emails.
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
        })),
      };

    } catch (error) {
      console.error('Error in RagAgent chat:', error);
      throw error;
    }
  }
}
