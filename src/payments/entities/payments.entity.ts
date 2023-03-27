import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Loan } from '../../loans/entities/loan.entity';
import { Exclude } from 'class-transformer';

export enum PaymentType {
  CREDIT = 'credit',
  DEBIT = 'debit'
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  paymentDate: Date;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.DEBIT
  })
  type: PaymentType;

  @Column()
  @Exclude()
  createdBy: string;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @Column()
  lastUpdatedBy: string;

  @Exclude()
  @UpdateDateColumn()
  lastUpdatedOn: Date;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ManyToOne(() => Loan, (loan) => loan.payments)
  loan: Loan;
}
