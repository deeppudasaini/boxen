import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity('emails')
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'account_id' })
  accountId: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ length: 500, unique: true, name: 'message_id' })
  messageId: string;

  @Column({ length: 500, nullable: true, name: 'thread_id' })
  threadId: string;

  @Column({ type: 'text', nullable: true })
  subject: string;

  @Column({ length: 255, nullable: true, name: 'from_email' })
  fromEmail: string;

  @Column({ length: 255, nullable: true, name: 'from_name' })
  fromName: string;

  @Column({ type: 'text', array: true, nullable: true, name: 'to_emails' })
  toEmails: string[];

  @Column({ type: 'text', array: true, nullable: true, name: 'cc_emails' })
  ccEmails: string[];

  @Column({ type: 'text', array: true, nullable: true, name: 'bcc_emails' })
  bccEmails: string[];

  @Column({ type: 'text', nullable: true, name: 'body_text' })
  bodyText: string;

  @Column({ type: 'text', nullable: true, name: 'body_html' })
  bodyHtml: string;

  @Column({ type: 'timestamp', nullable: true, name: 'received_at' })
  receivedAt: Date;

  @Column({ default: false, name: 'is_read' })
  isRead: boolean;

  @Column({ default: false, name: 'is_starred' })
  isStarred: boolean;

  @Column({ type: 'text', array: true, nullable: true })
  labels: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
