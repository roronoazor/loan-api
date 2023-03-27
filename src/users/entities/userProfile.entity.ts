import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from '../entities/user.entity';
import { IdentificationTypeEnum } from '../enums';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true
  })
  address: string;

  @Column({ 
    unique: true,
    nullable: true
  })
  phoneNumber: string;

  @Column({ 
    unique: true,
    nullable: true
  })
  identificationNumber: string;

  @Column({ unique: true  })
  bvn: string;

  @Column({
    type: 'enum',
    enum: IdentificationTypeEnum
   })
  identificationType: IdentificationTypeEnum;
  
  @Column()
  @Exclude()
  createdBy: string;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Column()
  @Exclude()
  lastUpdatedBy: string;

  @Exclude()
  @UpdateDateColumn()
  lastUpdatedOn: Date;

  @OneToOne(() => User, user => user.profile)
  user: User;
}