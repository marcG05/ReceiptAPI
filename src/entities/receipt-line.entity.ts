import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Receipt } from './receipt.entity';

@Entity('receipt_line')
export class ReceiptLine {
  @PrimaryColumn({ length: 50 })
  line_id: string;

  @Column({ length: 50, nullable: true })
  input: string;

  @Column({ nullable: true })
  qte: number;

  @Column({ type: 'money', nullable: true })
  subtotal: string;

  @ManyToOne(() => Receipt, receipt => receipt.lines)
  @JoinColumn({ name: 'receipt_id' })
  receipt: Receipt;
}