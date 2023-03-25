import { 
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    Param
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { LoanDto } from './dto';
import { LoansService } from './loans.service';

@UseGuards(JwtGuard)
@Controller('loans')
export class LoansController {

    constructor(
        private loanService: LoansService
    ){}

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
