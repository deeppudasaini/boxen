import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 50 })
  provider: string; // 'gmail', 'outlook', 'imap'

  @Column({ length: 255 })
  email: string;

  @Column({ type: 'text', nullable: true, name: 'access_token' })
  accessToken: string;

  @Column({ type: 'text', nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @Column({ type: 'timestamp', nullable: true, name: 'token_expires_at' })
  tokenExpiresAt: Date;

  @Column({ length: 255, nullable: true, name: 'imap_host' })
  imapHost: string;

  @Column({ type: 'int', nullable: true, name: 'imap_port' })
  imapPort: number;

  @Column({ length: 255, nullable: true, name: 'imap_username' })
  imapUsername: string;

  @Column({ type: 'text', nullable: true, name: 'imap_password' })
  imapPassword: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
