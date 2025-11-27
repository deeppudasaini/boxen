import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  findAll(@CurrentUser() user: any) {
    console.log('User:', user);
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(ClerkAuthGuard)
  getProfile(@CurrentUser() user: any) {
    return user;
  }
}
