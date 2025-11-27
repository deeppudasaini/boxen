import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(Email)
    private emailsRepository: Repository<Email>,
  ) {}

  async create(emailData: Partial<Email>): Promise<Email> {
    const email = this.emailsRepository.create(emailData);
    return this.emailsRepository.save(email);
  }

  async findByAccount(
    accountId: string,
    page: number = 1,
    limit: number = 50,
  ): Promise<{ emails: Email[]; total: number }> {
    const [emails, total] = await this.emailsRepository.findAndCount({
      where: { accountId },
      order: { receivedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { emails, total };
  }

  async findOne(id: string): Promise<Email> {
    return this.emailsRepository.findOne({ where: { id } });
  }

  async findByMessageId(messageId: string): Promise<Email> {
    return this.emailsRepository.findOne({ where: { messageId } });
  }

  async upsert(emailData: Partial<Email>): Promise<Email> {
    const existing = await this.findByMessageId(emailData.messageId);
    
    if (existing) {
      await this.emailsRepository.update(existing.id, emailData);
      return this.findOne(existing.id);
    }

    return this.create(emailData);
  }
}
