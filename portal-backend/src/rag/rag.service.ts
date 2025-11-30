import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailEmbedding } from './entities/email-embedding.entity';

@Injectable()
export class RagService {
  constructor(
    @InjectRepository(EmailEmbedding)
    private embeddingsRepository: Repository<EmailEmbedding>,
  ) {}

  async saveEmbedding(
    emailId: string,
    chunkIndex: number,
    chunkContent: string,
    embedding: number[],
  ): Promise<EmailEmbedding> {
    const entity = this.embeddingsRepository.create({
      emailId,
      chunkIndex,
      chunkContent,
      embedding,
    });
    return this.embeddingsRepository.save(entity);
  }

  async search(
    queryEmbedding: number[],
    limit: number = 5,
    similarityThreshold: number = 0.7,
  ): Promise<any[]> {
    // Using cosine distance (<=> operator)
    // 1 - (embedding <=> query) gives cosine similarity
    return this.embeddingsRepository
      .createQueryBuilder('e')
      .select([
        'e.id',
        'e.emailId',
        'e.chunkContent',
        '1 - (e.embedding <=> :query) AS similarity',
      ])
      .setParameter('query', JSON.stringify(queryEmbedding))
      .where('1 - (e.embedding <=> :query) > :threshold', { threshold: similarityThreshold })
      .orderBy('similarity', 'DESC')
      .limit(limit)
      .getRawMany();
  }
}
