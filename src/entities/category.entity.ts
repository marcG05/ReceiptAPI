import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Receipt } from './receipt.entity';

@Entity('categories')
export class Category {
  @PrimaryColumn({ length: 50 })
  categorie_id: string;

  @Column({ length: 50, nullable: true })
  name: string;

  @Column({ length: 50, nullable: true })
  type: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @OneToMany(() => Receipt, receipt => receipt.category)
  receipts: Receipt[];
}