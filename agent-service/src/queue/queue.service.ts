import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

export interface IngestionJobData {
  accountId: string;
  email: any;
}

export class QueueService {
  private connection: IORedis;
  private ingestionQueue: Queue;

  constructor() {
    this.connection = new IORedis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      maxRetriesPerRequest: null,
    });

    this.ingestionQueue = new Queue('email-ingestion', {
      connection: this.connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: {
          count: 100,
        },
        removeOnFail: {
          count: 50,
        },
      },
    });
  }

  async addIngestionJob(data: IngestionJobData): Promise<void> {
    await this.ingestionQueue.add('ingest-email', data);
  }

  getIngestionQueue(): Queue {
    return this.ingestionQueue;
  }

  async close(): Promise<void> {
    await this.ingestionQueue.close();
    await this.connection.quit();
  }
}
