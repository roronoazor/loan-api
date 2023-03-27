import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { IdentificationTypeEnum } from '../enums';

export class UserProfileDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bvn: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    identificationNumber: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEnum(IdentificationTypeEnum)
    identificationType: string;

}