import { Controller, Get, Post, Delete, Param, Body, UseGuards, Redirect } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ConnectGmailDto } from './dto/connect-gmail.dto';

@Controller('accounts')
@UseGuards(ClerkAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('gmail/connect')
  @Redirect()
  initiateGmailAuth() {
    const url = this.accountsService.getAuthUrl();
    return { url };
  }

  @Post('gmail/callback')
  async handleGmailCallback(
    @Body() connectGmailDto: ConnectGmailDto,
    @CurrentUser() user: any,
  ) {
    const account = await this.accountsService.handleCallback(
      connectGmailDto.code,
      user.sub,
    );
    return { success: true, account };
  }

  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.accountsService.findByUser(user.sub);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.accountsService.remove(id, user.sub);
    return { success: true };
  }
}
