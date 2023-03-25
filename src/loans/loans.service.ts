import { Injectable } from '@nestjs/common';
import { LoanDto } from './dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LoansService {

    applyForLoan(dto: LoanDto, user: User){

    }

    getLoanDetails(loanId: string, user: User) {

    }

    repayLoan(loanId: string, user: User) {

    }
}
