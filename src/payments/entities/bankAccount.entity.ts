import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  accountNumber: string;

  @Column()
  bankName: string;  // this might as well be a foreign key to bank, do it later 

  
  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdOn: Date;

  @Column()
  lastUpdatedBy: string;

  @UpdateDateColumn()
  lastUpdatedOn: Date;

  @ManyToOne(() => User, (user) => user.bankAccounts)
  user: User;
}
