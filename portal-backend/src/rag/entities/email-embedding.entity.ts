import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Email } from '../../emails/entities/email.entity';

@Entity('email_embeddings')
export class EmailEmbedding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email_id' })
  emailId: string;

  @ManyToOne(() => Email)
  @JoinColumn({ name: 'email_id' })
  email: Email;

  @Column({ name: 'chunk_index' })
  chunkIndex: number;

  @Column({ name: 'chunk_content', type: 'text' })
  chunkContent: string;

  @Column({ type: 'vector', nullable: true })
  embedding: number[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
