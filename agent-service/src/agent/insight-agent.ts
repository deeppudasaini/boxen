import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import axios from 'axios';

export class InsightAgent {
  private llm: ChatOpenAI;
  private apiBaseUrl: string;

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.2,
    });
    this.apiBaseUrl = process.env.PORTAL_BACKEND_URL || 'http://localhost:3000';
  }

  async generateInsights(userId: string): Promise<void> {
    try {
      console.log(`Generating insights for user ${userId}`);

      // Mock context for MVP
      const emailContext = `
        Subject: Invoice #123
        From: vendor@supply.com
        Body: Please pay $500 by next Tuesday.

        Subject: Meeting
        From: client@bigcorp.com
        Body: Let's discuss the contract renewal next week.
      `;

      // 2. Generate Insights
      const template = `Analyze the following emails and extract key insights.
Return a JSON array of objects with fields: title, description, insightType (deadline, relationship, topic), confidenceScore (0-1).

Emails:
{context}

Insights JSON:`;

      const prompt = PromptTemplate.fromTemplate(template);
      const chain = prompt.pipe(this.llm).pipe(new JsonOutputParser());

      const insights:any = await chain.invoke({ context: emailContext });

      // 3. Save Insights
      if (Array.isArray(insights)) {
        for (const insight of insights) {
          await axios.post(
            `${this.apiBaseUrl}/insights`,
            {
              userId,
              ...insight,
              metadata: { source: 'agent-service' },
            },
            { headers: { 'Content-Type': 'application/json' } }
          );
        }
      }

      console.log(`Generated ${insights.length} insights.`);
    } catch (error) {
      console.error('Error generating insights:', error);
    }
  }
}
