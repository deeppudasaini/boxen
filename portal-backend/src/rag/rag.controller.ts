import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RagService } from './rag.service';
import { Public } from '../auth/decorators/public.decorator';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post('embeddings')
  @Public() // Allow agent-service to post without user auth
  async saveEmbedding(
    @Body() body: { emailId: string; chunkIndex: number; chunkContent: string; embedding: number[] },
  ) {
    return this.ragService.saveEmbedding(
      body.emailId,
      body.chunkIndex,
      body.chunkContent,
      body.embedding,
    );
  }

  @Post('search')
  @UseGuards(ClerkAuthGuard) // Only authenticated users can search
  async search(@Body() body: { embedding: number[]; limit?: number; threshold?: number }) {
    return this.ragService.search(body.embedding, body.limit, body.threshold);
  }
}
