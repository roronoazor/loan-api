// loan.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { LoanStatusEnum } from '../enums/loanStatus.enum';
import { Payment } from '../../payments/entities/payments.entity';
import { Exclude, Expose } from 'class-transformer';

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

  @Exclude()
  @Column()
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

  @ManyToOne(() => User, (user) => user.loans)
  user: User;

  @OneToMany(() => Payment, (payment)=>payment.loan)
  payments: Payment[];

  @Expose()
  get repaymentAmount(): number {
    return this.amount * this.interestRate;
  }

  @Expose()
  get dueDate(): Date {
    const dueDate = new Date(this.createdOn.getTime() + (this.duration * 24 * 60 * 60 * 1000));
    return dueDate;
  }

}