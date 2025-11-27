import { IsString, IsNotEmpty } from 'class-validator';

export class ConnectGmailDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
