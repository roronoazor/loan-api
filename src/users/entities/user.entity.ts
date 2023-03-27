import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Loan } from '../../loans/entities/loan.entity';
import { UserProfile } from '../entities/userProfile.entity';
import { BankAccount } from '../../payments/entities/bankAccount.entity';
import { BankCard } from '../../payments/entities/bankCard.entity';
import { Payment } from '../../payments/entities/payments.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    default: true
  })
  isActive: boolean;

  @Column({
    default: false
  })
  isAdmin: boolean;

  
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

  @OneToOne(() => UserProfile, { cascade: true })
  @JoinColumn()
  profile: UserProfile;

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.user)
  bankAccounts: BankAccount[];

  @OneToMany(() => BankCard, (bankCard) => bankCard.user)
  bankCards: BankCard[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Loan, (loan) => loan.user)
    loans: Loan[]

}
