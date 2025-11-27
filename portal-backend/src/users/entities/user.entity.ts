import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true, name: 'clerk_user_id' })
  clerkUserId: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 100, nullable: true, name: 'first_name' })
  firstName: string;

  @Column({ length: 100, nullable: true, name: 'last_name' })
  lastName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
