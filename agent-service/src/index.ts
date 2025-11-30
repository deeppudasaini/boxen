import dotenv from 'dotenv';
import { QueueService } from './queue/queue.service';
import { IngestionWorker } from './worker/ingestion.worker';
import { ApiServer } from './api/server';

dotenv.config();

console.log('AI Engine Service Starting...');

let queueService: QueueService;
let ingestionWorker: IngestionWorker;
let apiServer: ApiServer;

async function main() {
  try {
    // Initialize queue service
    queueService = new QueueService();
    console.log('Queue service initialized');

    // Initialize ingestion worker
    ingestionWorker = new IngestionWorker();
    console.log('Ingestion worker started');

    // Start API Server
    apiServer = new ApiServer();
    apiServer.start();

    console.log('AI Engine Service Initialized');
    console.log('Ready to process emails and chat queries');
  } catch (error) {
    console.error('Error initializing AI Engine:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  if (queueService) await queueService.close();
  if (ingestionWorker) await ingestionWorker.close();
  process.exit(0);
});

main().catch((error) => {
  console.error('Error starting AI Engine Service:', error);
  process.exit(1);
});
