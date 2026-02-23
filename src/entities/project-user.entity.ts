import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity('projects_users')
export class ProjectUser {
  @PrimaryColumn({ length: 50 })
  project_id: string;

  @PrimaryColumn({ length: 50 })
  user_id: string;

  @Column({ nullable: true })
  access: number;

  @ManyToOne(() => Project, project => project.projectUsers)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, user => user.projectUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;
}