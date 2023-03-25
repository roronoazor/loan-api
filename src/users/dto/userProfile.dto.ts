import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { IdentificationTypeEnum } from '../enums';

export class UserProfileDto {

    
    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    bvn: string;
    
    @IsNotEmpty()
    @IsString()
    identificationNumber: string;
    
    @IsNotEmpty()
    @IsString()
    @IsEnum(IdentificationTypeEnum)
    identificationType: string;

}