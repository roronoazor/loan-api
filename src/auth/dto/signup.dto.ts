import { IsEmail, IsNotEmpty } from "class-validator";

export class SignupDto {
 
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
    
    isActive: boolean;

    createdBy: string;

    lastUpdatedBy: string;
}