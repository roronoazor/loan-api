import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoanDto } from './dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { LoanStatusEnum } from './enums/loanStatus.enum';
import { In } from "typeorm";

@Injectable()
export class LoansService {

    constructor(
        @InjectRepository(Loan)
        private loanRepository: Repository<Loan>
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

        const disbursedLoan = await this.loanRepository.save({
            ...dto,
            // the interest should probably come from some config 
            // table defined in the database and should 
            // probably be a float
            interestRate: 5,   
            // by default we approve all loans and immediately 
            // disburse them, but there should be some logic
            // to assess if the user is qualified for this loan
            status: LoanStatusEnum.DISBURSED,
            user,
            createdBy: user.email,
            lastUpdatedBy: user.email
        })

        return this.appendLoanDetails(disbursedLoan);
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

    async repayLoan(loanId: string, user: User) {
        
        let loan = await this.loanRepository.findOne({
            where: { id: loanId }
        });

        if (!loan){
            throw new EntityNotFoundError(Loan, loanId);
        }
        
        // ensure that the user who took the loan is the 
        // same person repaying the loan
        if (user?.id != loan?.user?.id){
            throw new HttpException('Not authorized', HttpStatus.BAD_REQUEST)
        }

        // if the loan has is disburse mode, 
        // settle the loan and create a payment record
        if (loan.status == LoanStatusEnum.DISBURSED){
            
            loan.status = LoanStatusEnum.SETTLED;
            loan.repaymentDate = new Date();
            loan.amountPaid = loan.amount * loan.interestRate; 
            const settledLoan = await this.loanRepository.save(loan);
            return { message: 'success', data : { loan: settledLoan } }
        }
        // if the loan has not been disbursed no need to settle it
        // raise an error or just return the loan details
        return { message: 'success', data : { loan } }
    }


    async getLoansByUser(userId: string) { 
        const loans = await this.loanRepository.find({
          where: {
            user : { id: userId },
          },
          order: {
            createdOn: 'DESC',
          },
        });
        return { message: 'success', data: { loans } }
      }
}
