// loan.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { LoanStatusEnum } from '../enums/loanStatus.enum';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  amount: number;

  @Column()
  interestRate: number;

  @Column()
  duration: number; // in days

  @Column({ nullable: true })
  repaymentDate: Date;

  @Column({ nullable: true })
  amountPaid: number;

  @Column({
    type: 'enum',
    enum: LoanStatusEnum
  })
  status: LoanStatusEnum

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdOn: Date;

  @Column()
  lastUpdatedBy: string;

  @UpdateDateColumn()
  lastUpdatedOn: Date;

  @ManyToOne(() => User, (user) => user.loans)
  user: User;
}