import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: any;
  internalDate: string;
}

export class GmailConnector {
  private oauth2Client: OAuth2Client;
  private gmail: any;

  constructor(accessToken: string, refreshToken: string) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI,
    );

    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    this.gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
  }

  async fetchMessages(maxResults: number = 100): Promise<GmailMessage[]> {
    try {
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        maxResults,
      });

      const messages = response.data.messages || [];
      const fullMessages: GmailMessage[] = [];

      for (const message of messages) {
        const fullMessage = await this.gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full',
        });
        fullMessages.push(fullMessage.data);
      }

      return fullMessages;
    } catch (error) {
      console.error('Error fetching Gmail messages:', error);
      throw error;
    }
  }

  async refreshAccessToken(): Promise<string> {
    const { credentials } = await this.oauth2Client.refreshAccessToken();
    return credentials.access_token;
  }

  async setupPushNotifications(topicName: string): Promise<void> {
    try {
      await this.gmail.users.watch({
        userId: 'me',
        requestBody: {
          topicName,
          labelIds: ['INBOX'],
        },
      });
      console.log('Gmail push notifications set up successfully');
    } catch (error) {
      console.error('Error setting up push notifications:', error);
      throw error;
    }
  }
}
