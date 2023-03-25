import { IsOptional } from "class-validator";

export class RegisterProfileDto{

    @IsOptional()
    address: string;

    phoneNumber: string;
    identificationNumber: string;
    bvn: string;
    identificationType: string;

}