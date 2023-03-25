// bank-card.entity.ts

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class BankCard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cardNumber: string;

  @Column()
  cardHolderName: string;

  @Column()
  cvv: string;

  @Column()
  expiryDate: string;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdOn: Date;

  @Column()
  lastUpdatedBy: string;

  @UpdateDateColumn()
  lastUpdatedOn: Date;

  @ManyToOne(() => User, (user) => user.bankCards)
  user: User;
}
