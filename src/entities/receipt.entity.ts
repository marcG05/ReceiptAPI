import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Project } from './project.entity';
import { ReceiptLine } from './receipt-line.entity';

@Entity('receipts')
export class Receipt {
  @PrimaryColumn({ length: 50 })
  receipt_id: string;

  @Column({ type: 'timestamp', nullable: true })
  entry_date: Date;

  @Column({ type: 'money', nullable: true })
  total: string;

  @Column({ length: 50, nullable: true })
  description: string;

  @ManyToOne(() => User, user => user.receipts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, category => category.receipts)
  @JoinColumn({ name: 'categorie_id' })
  category: Category;

  @ManyToOne(() => Project, project => project.receipts)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToMany(() => ReceiptLine, line => line.receipt)
  lines: ReceiptLine[];
}