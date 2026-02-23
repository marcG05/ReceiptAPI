import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Receipt } from './receipt.entity';
import { ProjectUser } from './project-user.entity';

@Entity('projects')
export class Project {
  @PrimaryColumn({ length: 50 })
  project_id: string;

  @Column({ length: 50 })
  project_name: string;

  @Column({ length: 50, nullable: true })
  description: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  status: number;

  // Self-referencing foreign key (parent project)
  @ManyToOne(() => Project, project => project.subProjects, { nullable: true })
  @JoinColumn({ name: 'project_id_1' })
  parentProject: Project;

  @OneToMany(() => Project, project => project.parentProject)
  subProjects: Project[];

  @OneToMany(() => Receipt, receipt => receipt.project)
  receipts: Receipt[];

  @OneToMany(() => ProjectUser, pu => pu.project)
  projectUsers: ProjectUser[];
}