import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber, Min } from "class-validator";

export class LoanDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0) // set the minimum amount you can borrow to something reasonable 
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0) // set the minimum amount you can borrow to something reasonable 
    duration: number; // please note the duration is in days

}