import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class RegisterProfileDto{

    @ApiProperty()
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsOptional()
    phoneNumber: string;

    @ApiProperty()
    @IsOptional()
    identificationNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    bvn: string; // this shoule be unique in the api

    @ApiProperty()
    @IsNotEmpty()
    identificationType: string;
}