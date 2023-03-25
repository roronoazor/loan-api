import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './entities/bankAccount.entity';
import { BankCard } from './entities/bankCard.entity';
import { Payment } from './entities/payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount, BankCard, Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
