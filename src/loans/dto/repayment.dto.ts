import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber, Min } from "class-validator";

export class RepaymentAmountDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0) // set the minimum amount you can borrow to something reasonable 
    amount: number;

}