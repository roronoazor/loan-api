import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ConfigService } from "@nestjs/config";


export class LoanDto {
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0) // set the minimum amount you can borrow to something reasonable 
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0) // set the minimum amount you can borrow to something reasonable 
    duration: number;

}