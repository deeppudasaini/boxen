import { Controller, Post, Body, UseGuards, Get, Param, Query } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  @Public() // Allow agent-service to post without auth
  async create(@Body() emailData: any) {
    return this.emailsService.upsert(emailData);
  }

  @Get('account/:accountId')
  @UseGuards(ClerkAuthGuard)
  async findByAccount(
    @Param('accountId') accountId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '50',
  ) {
    return this.emailsService.findByAccount(
      accountId,
      parseInt(page, 10),
      parseInt(limit, 10),
    );
  }

  @Get(':id')
  @UseGuards(ClerkAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.emailsService.findOne(id);
  }
}
