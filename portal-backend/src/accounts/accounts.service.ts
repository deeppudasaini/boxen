import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { google } from 'googleapis';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  private oauth2Client;

  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI,
    );
  }

  getAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify',
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
    });
  }

  async handleCallback(code: string, userId: string): Promise<Account> {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);

    // Get user's email from Gmail API
    const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
    const profile = await gmail.users.getProfile({ userId: 'me' });

    // Check if account already exists
    let account = await this.accountsRepository.findOne({
      where: { userId, email: profile.data.emailAddress },
    });

    if (account) {
      // Update tokens
      account.accessToken = tokens.access_token;
      account.refreshToken = tokens.refresh_token || account.refreshToken;
      account.tokenExpiresAt = new Date(tokens.expiry_date);
    } else {
      // Create new account
      account = this.accountsRepository.create({
        userId,
        provider: 'gmail',
        email: profile.data.emailAddress,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenExpiresAt: new Date(tokens.expiry_date),
        isActive: true,
      });
    }

    return this.accountsRepository.save(account);
  }

  async findByUser(userId: string): Promise<Account[]> {
    return this.accountsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Account> {
    return this.accountsRepository.findOne({
      where: { id, userId },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.accountsRepository.delete({ id, userId });
  }

  async refreshToken(account: Account): Promise<Account> {
    this.oauth2Client.setCredentials({
      refresh_token: account.refreshToken,
    });

    const { credentials } = await this.oauth2Client.refreshAccessToken();
    
    account.accessToken = credentials.access_token;
    account.tokenExpiresAt = new Date(credentials.expiry_date);

    return this.accountsRepository.save(account);
  }
}
