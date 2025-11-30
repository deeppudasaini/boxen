import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summary } from './entities/summary.entity';

@Injectable()
export class SummariesService {
  constructor(
    @InjectRepository(Summary)
    private summariesRepository: Repository<Summary>,
  ) {}

  async create(data: Partial<Summary>): Promise<Summary> {
    const summary = this.summariesRepository.create(data);
    return this.summariesRepository.save(summary);
  }

  async getLatest(userId: string, type: string): Promise<Summary | null> {
    return this.summariesRepository.findOne({
      where: { userId, summaryType: type },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(userId: string): Promise<Summary[]> {
    return this.summariesRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }
}
