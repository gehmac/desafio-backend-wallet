import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('uuid', { array: true, default: () => 'ARRAY[]::uuid[]' })
  walletIds: string[];

  @Exclude()
  @Column({ name: 'hashed_refresh_token', nullable: true })
  hashedRefreshToken?: string;
}
