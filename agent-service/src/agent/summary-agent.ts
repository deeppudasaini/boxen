import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import axios from 'axios';

export class SummaryAgent {
  private llm: ChatGoogleGenerativeAI;
  private apiBaseUrl: string;

  constructor() {
    this.llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY!,
      model: 'gemini-1.5-pro',
      temperature: 0.2,
    });
    this.apiBaseUrl = process.env.PORTAL_BACKEND_URL || 'http://localhost:3000';
  }

  async generateDailySummary(userId: string): Promise<void> {
    try {
      console.log(`Generating daily summary for user ${userId}`);

      // Mock context for MVP demonstration
      const emailContext = `
        Subject: Project Update
        From: boss@company.com
        Body: We need to finish the report by Friday.

        Subject: Lunch
        From: colleague@company.com
        Body: Tacos at 12?
      `;

      // Generate Summary
      const template = `Summarize the following emails into a concise daily briefing.
Focus on action items and important updates.

Emails:
{context}

Daily Summary:`;

      const prompt = PromptTemplate.fromTemplate(template);
      const chain = prompt.pipe(this.llm).pipe(new StringOutputParser());

      const summaryContent = await chain.invoke({ context: emailContext });

      // Save Summary
      await axios.post(
        `${this.apiBaseUrl}/summaries`,
        {
          userId,
          summaryType: 'daily',
          periodStart: new Date(Date.now() - 24 * 60 * 60 * 1000),
          periodEnd: new Date(),
          content: summaryContent,
          metadata: { source: 'agent-service' },
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Daily summary generated and saved.');
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  }
}
