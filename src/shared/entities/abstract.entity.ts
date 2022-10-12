import {
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export abstract class AbstarctEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ default: 'system_user' })
  createdBy: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;

  @Column({ default: 'system_user' })
  updatedBy: string;

  @Column({ default: true })
  isActive: boolean;
}
