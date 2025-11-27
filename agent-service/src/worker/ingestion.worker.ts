import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import axios from 'axios';
import { IngestionJobData } from '../queue/queue.service';

export class IngestionWorker {
  private worker: Worker;
  private apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = process.env.PORTAL_BACKEND_URL || 'http://localhost:3000';

    const connection = new IORedis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      maxRetriesPerRequest: null,
    });

    this.worker = new Worker(
      'email-ingestion',
      async (job: Job<IngestionJobData>) => {
        await this.processEmail(job.data);
      },
      {
        connection,
        concurrency: 5,
      },
    );

    this.worker.on('completed', (job) => {
      console.log(`Job ${job.id} completed successfully`);
    });

    this.worker.on('failed', (job, err) => {
      console.error(`Job ${job?.id} failed:`, err);
    });
  }

  private async processEmail(data: IngestionJobData): Promise<void> {
    try {
      console.log(`Processing email for account ${data.accountId}`);

      // Save email to portal-backend via API
      const response = await axios.post(
        `${this.apiBaseUrl}/emails`,
        {
          accountId: data.accountId,
          ...data.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(`Email saved: ${response.data.id}`);
    } catch (error) {
      console.error('Error processing email:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.worker.close();
  }
}
