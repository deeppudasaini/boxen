import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('summaries')
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Get('daily')
  @UseGuards(ClerkAuthGuard)
  async getLatestDaily(@CurrentUser() user: any) {
    return this.summariesService.getLatest(user.sub, 'daily');
  }

  @Post()
  @Public() // Allow agent-service to post
  async create(@Body() data: any) {
    return this.summariesService.create(data);
  }
}
