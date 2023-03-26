import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoanDto } from './dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { LoanStatusEnum } from './enums/loanStatus.enum';
import { In, DataSource } from "typeorm";
import { Payment, PaymentType } from 'src/payments/entities/payments.entity';


@Injectable()
export class LoansService {

    constructor(
        @InjectRepository(Loan)
        private loanRepository: Repository<Loan>,
        private connection: DataSource
    ){}

    async findOpenOrDisbursedLoans(user: User) {
        const statuses = [LoanStatusEnum.OPENED, LoanStatusEnum.DISBURSED];
        return await this.loanRepository.find({
            where: {
              user: { id: user.id },
              status: In(statuses),
            },
          });
    }

    async applyForLoan(dto: LoanDto, user: User){

        const activeLoans = await this.findOpenOrDisbursedLoans(user);
        if (activeLoans.length > 0){
            throw new HttpException('Please repay all active loans before applying', HttpStatus.BAD_REQUEST);
        }

        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
          const loan = await this.loanRepository.create({
            ...dto,
            interestRate: 5,
            status: LoanStatusEnum.DISBURSED,
            user,
            createdBy: user.email,
            lastUpdatedBy: user.email,
          });
          await queryRunner.manager.save(loan);
    
          const payment = await queryRunner.manager.create(Payment, {
            amount: dto.amount,
            paymentDate: new Date(),
            type: PaymentType.DEBIT,
            user,
            loan,
            createdBy: user.email,
            lastUpdatedBy: user.email,
          });
          await queryRunner.manager.save(payment);
    
          await queryRunner.commitTransaction();
    
          return this.appendLoanDetails(loan);
        } catch (err) {
          await queryRunner.rollbackTransaction();
          throw err;
        } finally {
          await queryRunner.release();
        }
    }

    async appendLoanDetails(loan :Loan){
        // Calculate repayment amount
        const repaymentAmount = loan.amount * loan.interestRate;

        // Calculate repayment date
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + loan.duration);
        return {
            ...loan,
            repaymentAmount,
            dueDate
        }
    }

    async getLoanDetails(loanId: string, user: User) {
        let loan = await this.loanRepository.findOne({
            where: { id: loanId },
            relations: ['user']
        });
        
        if (!loan){
            throw new EntityNotFoundError(Loan, loanId);
        }

        // if the user calling this api is not the one who
        // apply for the loan throw an error,
        // this can be removed depending on the use case if needed
        if (user?.id != loan?.user?.id){
            throw new HttpException('Not authorized', HttpStatus.BAD_REQUEST)
        }

        const approvedLoan = await this.appendLoanDetails(loan);
        return { message: 'success', data: { loan: approvedLoan } }
    }

    async repayLoan(loanId: string, paymentAmount: number, user: User) {
        const queryRunner = this.connection.createQueryRunner();
      
        try {
          await queryRunner.connect();
          await queryRunner.startTransaction();
      
          let loan = await queryRunner.manager.findOne(Loan, {
            where: { id: loanId },
            relations: ['payments', 'user'],
          });
      
          if (!loan) {
            throw new EntityNotFoundError(Loan, loanId);
          }
      
          if (user?.id !== loan?.user?.id) {
            throw new HttpException('Not authorized', HttpStatus.BAD_REQUEST);
          }
      
          // Calculate the total payment made towards the loan
          const totalPayment = loan.payments.reduce((acc, payment) => {
            if (payment.type === 'credit') {
              return acc + payment.amount;
            } else {
              return acc - payment.amount;
            }
          }, 0);

          
      
          // Calculate the expected payment based on the interest rate
          const expectedPayment = loan.amount * loan.interestRate;
          

          // Check if the payment amount plus the total payment is equal to the expected payment
          if (paymentAmount + totalPayment >= expectedPayment) {
            // Update the loan status to SETTLED
            loan.status = LoanStatusEnum.SETTLED;
            loan.amountPaid = paymentAmount;
          }
      
          // Create a new payment record
          const payment = new Payment();
          payment.amount = paymentAmount;
          payment.paymentDate = new Date();
          payment.type = PaymentType.CREDIT;
          payment.user = user;
          payment.createdBy = user.email;
          payment.lastUpdatedBy = user.email;
          payment.loan = loan;
          
          // Save the payment and loan records
          await queryRunner.manager.save(loan);
          await queryRunner.manager.save(payment);
          
      
          await queryRunner.commitTransaction();
          return { message: 'success', data: { loan } };
        } catch (err) {
          await queryRunner.rollbackTransaction();
          throw err;
        } finally {
          await queryRunner.release();
        }
      }
      

    async getLoansByUser(userId: string, page: number = 1, perPage: number = 10) { 
        const [loans, totalCount] = await this.loanRepository.findAndCount({
          where: {
            user : { id: userId },
          },
          order: {
            createdOn: 'DESC',
          },
          skip: (page - 1) * perPage,
          take: perPage,
        });

        return {
          message: 'success',
          data: {
            loans,
            pagination: {
              currentPage: page,
              perPage,
              totalPages: Math.ceil(totalCount / perPage),
              totalCount,
            },
          },
        };
      }
}
