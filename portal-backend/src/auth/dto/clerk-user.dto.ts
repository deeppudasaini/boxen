import { IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../interfaces/clerk-jwt.interface';

export class ClerkUserDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
