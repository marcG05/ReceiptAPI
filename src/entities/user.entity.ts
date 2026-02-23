import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Receipt } from './receipt.entity';
import { ProjectUser } from './project-user.entity';

@Entity('users')
export class User {
  @PrimaryColumn({ length: 50 })
  user_id: string;

  @Column({ length: 50, nullable: true })
  username: string;

  @Column({ nullable: true })
  type: number;

  @OneToMany(() => Receipt, receipt => receipt.user)
  receipts: Receipt[];

  @OneToMany(() => ProjectUser, pu => pu.user)
  projectUsers: ProjectUser[];
}