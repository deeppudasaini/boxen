import * as cheerio from 'cheerio';
import { GmailMessage } from './gmail.connector';

export interface NormalizedEmail {
  messageId: string;
  threadId: string;
  subject: string;
  fromEmail: string;
  fromName: string;
  toEmails: string[];
  ccEmails: string[];
  bccEmails: string[];
  bodyText: string;
  bodyHtml: string;
  receivedAt: Date;
  labels: string[];
}

export class EmailNormalizer {
  static normalize(gmailMessage: GmailMessage): NormalizedEmail {
    const headers = gmailMessage.payload.headers;
    const parts = gmailMessage.payload.parts || [];

    return {
      messageId: gmailMessage.id,
      threadId: gmailMessage.threadId,
      subject: this.getHeader(headers, 'Subject') || '',
      fromEmail: this.extractEmail(this.getHeader(headers, 'From') || ''),
      fromName: this.extractName(this.getHeader(headers, 'From') || ''),
      toEmails: this.parseEmailList(this.getHeader(headers, 'To') || ''),
      ccEmails: this.parseEmailList(this.getHeader(headers, 'Cc') || ''),
      bccEmails: this.parseEmailList(this.getHeader(headers, 'Bcc') || ''),
      bodyText: this.extractTextBody(gmailMessage.payload),
      bodyHtml: this.extractHtmlBody(gmailMessage.payload),
      receivedAt: new Date(parseInt(gmailMessage.internalDate, 10)),
      labels: gmailMessage.labelIds || [],
    };
  }

  private static getHeader(headers: any[], name: string): string | null {
    const header = headers.find((h) => h.name.toLowerCase() === name.toLowerCase());
    return header ? header.value : null;
  }

  private static extractEmail(fromString: string): string {
    const match = fromString.match(/<(.+?)>/);
    return match ? match[1] : fromString;
  }

  private static extractName(fromString: string): string {
    const match = fromString.match(/^(.+?)\s*</);
    return match ? match[1].replace(/"/g, '').trim() : '';
  }

  private static parseEmailList(emailString: string): string[] {
    if (!emailString) return [];
    return emailString.split(',').map((email) => this.extractEmail(email.trim()));
  }

  private static extractTextBody(payload: any): string {
    if (payload.body && payload.body.data) {
      return this.decodeBase64(payload.body.data);
    }

    if (payload.parts) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/plain' && part.body && part.body.data) {
          return this.decodeBase64(part.body.data);
        }
        if (part.parts) {
          const text = this.extractTextBody(part);
          if (text) return text;
        }
      }
    }

    return '';
  }

  private static extractHtmlBody(payload: any): string {
    if (payload.body && payload.body.data && payload.mimeType === 'text/html') {
      return this.decodeBase64(payload.body.data);
    }

    if (payload.parts) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/html' && part.body && part.body.data) {
          return this.decodeBase64(part.body.data);
        }
        if (part.parts) {
          const html = this.extractHtmlBody(part);
          if (html) return html;
        }
      }
    }

    return '';
  }

  private static decodeBase64(data: string): string {
    return Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
  }

  static htmlToText(html: string): string {
    const $ = cheerio.load(html);
    return $.text();
  }
}
