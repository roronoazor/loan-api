import { 
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    Param,
    UseFilters
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { EntityNotFoundFilter } from '../exceptions/404.exception';
import { LoanDto, RepaymentAmountDto } from './dto';
import { LoansService } from './loans.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('loans')
@UseFilters(EntityNotFoundFilter)
@UseGuards(JwtGuard)
@Controller('loans')
export class LoansController {

    constructor(
        private loanService: LoansService
    ){}

    @Get('')
    @ApiOperation({description: `
        This api returns all the loans a user has taken,
        the api also supports pagination and its a protected
        route that needs a token.

        Possible suggestion: the api could be improved upon to support
        filtering, you filter across dates, maybe loan status etc.
        `
    })
    getAllLoansForUser(@Req() req){
        // this api should support pagination
        // and filtering
        return this.loanService.getLoansByUser(req.user.id);
    }

    @Post('')
    @ApiOperation({description: `
        This api allows a user to apply for a loan it uses the 
        LoanDto ( amount and duration in days ) to get 
        information from the post body. please note
        that when a user applies for a loan certain logic is followed
        
        1.) the api checks if the user has an open or disbursed loan, if an
        open or disbursed loan is found for the user, it returns a 400 request and 
        ask the user to repay his loan.
        2.) if no open or disbursed loan is found for the user, then a loan is
        automatically created and then disbursed and a payment record is 
        created to for that loan. to represent the loan being disbursed.

        Possible suggestion: In a proper loan api, there would be some 
        function that does risk assesment for a customer, and determine if that 
        customer is eligible for a loan and how much to offer that customer.
        `
    })
    applyForLoan(@Req() req, @Body() dto: LoanDto){
        return this.loanService.applyForLoan(dto, req.user);
    }

    @Get('/:id')
    @ApiOperation({description: `
    This api allows the user who applied for a loan
    to get the details of thier loan.
    `
    })
    getLoanDetails(@Req() req, @Param('id') id:string){
        return this.loanService.getLoanDetails(id, req.user);
    }

    @Post('/:id/repay')
    @ApiOperation({
        description: `
        This api allows the user to repay thier loan.

        it checks the amount being sent and creates a payment 
        record for that repayment, if the amount being sent is
        equat to or greater than the expected amount, it sets the 
        loan status to settled and saves it, else it just creates
        the payment record for the loan.

        Possible suggestion: it is generally a good idea to save the 
        reference of the payment gotten from your payment provider
        which could be paystack or flutterwave etc. to the database. 
        Also send a notification or sms to the user to acknowledge
        receiving the payment.
        `
    })
    repayLoan(@Req() req, @Param('id') id:string, @Body() dto: RepaymentAmountDto){
        return this.loanService.repayLoan(id, dto.amount, req.user);      
    }

}
