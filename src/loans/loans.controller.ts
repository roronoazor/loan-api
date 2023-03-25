import { 
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    Param,
    Catch,
    UseFilters
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { EntityNotFoundFilter } from 'src/exceptions/404.exception';
import { LoanDto } from './dto';
import { LoansService } from './loans.service';

@UseFilters(EntityNotFoundFilter)
@UseGuards(JwtGuard)
@Controller('loans')
export class LoansController {

    constructor(
        private loanService: LoansService
    ){}

    getAllLoansForUser(@Req() req){
        // this api should support pagination
        // and filtering
        return this.loanService.getLoansByUser(req.user.id);
    }

    @Post('')
    applyForLoan(@Req() req, @Body() dto: LoanDto){
        return this.loanService.applyForLoan(dto, req.user);
    }

    @Get('/:id')
    getLoanDetails(@Req() req, @Param('id') id:string){
        return this.loanService.getLoanDetails(id, req.user);
    }

    @Post('/:id/repay')
    repayLoan(@Req() req, @Param('id') id:string){
        return this.loanService.repayLoan(id, req.user);      
    }

}
