import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RagController } from './rag.controller';
import { RagService } from './rag.service';
import { EmailEmbedding } from './entities/email-embedding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailEmbedding])],
  controllers: [RagController],
  providers: [RagService],
  exports: [RagService],
})
export class RagModule {}
