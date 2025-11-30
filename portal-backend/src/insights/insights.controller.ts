import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  async findAll(@CurrentUser() user: any) {
    return this.insightsService.findAll(user.sub);
  }

  @Post()
  @Public() // Allow agent-service to post
  async create(@Body() data: any) {
    return this.insightsService.create(data);
  }
}
