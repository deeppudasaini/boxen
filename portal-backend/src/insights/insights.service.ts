import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insight } from './entities/insight.entity';

@Injectable()
export class InsightsService {
  constructor(
    @InjectRepository(Insight)
    private insightsRepository: Repository<Insight>,
  ) {}

  async create(data: Partial<Insight>): Promise<Insight> {
    const insight = this.insightsRepository.create(data);
    return this.insightsRepository.save(insight);
  }

  async findAll(userId: string): Promise<Insight[]> {
    return this.insightsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 20,
    });
  }
}
