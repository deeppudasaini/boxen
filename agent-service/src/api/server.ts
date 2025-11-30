import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { RagAgent } from '../agent/rag-agent';
import { SummaryAgent } from '../agent/summary-agent';
import { InsightAgent } from '../agent/insight-agent';

export class ApiServer {
  private app: express.Application;
  private port: number;
  private agent: RagAgent;
  private summaryAgent: SummaryAgent;
  private insightAgent: InsightAgent;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3001', 10);
    this.agent = new RagAgent();
    this.summaryAgent = new SummaryAgent();
    this.insightAgent = new InsightAgent();

    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  private configureRoutes() {
    this.app.post('/api/chat', async (req, res) => {
      try {
        const { query, userId } = req.body;
        if (!query) return res.status(400).json({ error: 'Query is required' });
        const response = await this.agent.chat(query, userId || 'default-user');
        res.json(response);
      } catch (error) {
        console.error('Error handling chat request:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    this.app.post('/api/trigger/summary', async (req, res) => {
      try {
        const { userId } = req.body;
        await this.summaryAgent.generateDailySummary(userId || 'default-user');
        res.json({ success: true, message: 'Summary generation triggered' });
      } catch (error) {
        console.error('Error triggering summary:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    this.app.post('/api/trigger/insights', async (req, res) => {
      try {
        const { userId } = req.body;
        await this.insightAgent.generateInsights(userId || 'default-user');
        res.json({ success: true, message: 'Insights generation triggered' });
      } catch (error) {
        console.error('Error triggering insights:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Agent API Server running on port ${this.port}`);
    });
  }
}
