import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import axios from 'axios';
import { IngestionJobData } from '../queue/queue.service';
import { Chunker } from '../rag/chunker';
import { Embedder } from '../rag/embedder';

export class IngestionWorker {
  private worker: Worker;
  private apiBaseUrl: string;
  private chunker: Chunker;
  private embedder: Embedder;

  constructor() {
    this.apiBaseUrl = process.env.PORTAL_BACKEND_URL || 'http://localhost:3000';
    this.chunker = new Chunker();
    this.embedder = new Embedder();

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

      // 1. Save email to portal-backend
      const emailResponse = await axios.post(
        `${this.apiBaseUrl}/emails`,
        {
          accountId: data.accountId,
          ...data.email,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const emailId = emailResponse.data.id;
      console.log(`Email saved: ${emailId}`);

      // 2. Chunk email body
      const content = data.email.bodyText || data.email.bodyHtml || '';
      if (!content) {
        console.log('No content to embed');
        return;
      }

      const chunks = await this.chunker.splitText(content);
      console.log(`Generated ${chunks.length} chunks`);

      // 3. Generate embeddings
      if (chunks.length > 0) {
        const embeddings = await this.embedder.embedDocuments(chunks);

        // 4. Save embeddings
        for (let i = 0; i < chunks.length; i++) {
          await axios.post(
            `${this.apiBaseUrl}/rag/embeddings`,
            {
              emailId,
              chunkIndex: i,
              chunkContent: chunks[i],
              embedding: embeddings[i],
            },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        console.log(`Saved ${chunks.length} embeddings`);
      }
    } catch (error) {
      console.error('Error processing email:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.worker.close();
  }
}
