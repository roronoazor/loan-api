import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto, RegisterProfileDto, SignupDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwt: JwtService,
        private config: ConfigService
    ){}

    async login (dto: LoginDto) {
         
        try {
            const user = await this.usersService.getUserByEmail(dto.email);
            const match = await this.usersService.verifyPassword(dto.password, user.password);
            if (!match) {
              throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
            }
            delete user.password;
            const accessToken = await this.signToken(user.id, user.email);

            return { message: 'success', data: { user, accessToken } };
          } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
          }
    }

    async signup (dto: SignupDto) {
        
        try{
            
            const hashedPassword = await this.usersService.hashPassword(dto.password);
            const user = await this.usersService.createUser({
                ...dto,
                password: hashedPassword,
                createdBy: 'self',
                lastUpdatedBy: 'self'
            });
            delete user.password ;
            const accessToken = await this.signToken(user.id, user.email);
            return { message: 'success', data: { user, accessToken } };
        }catch(e) {
            if (e?.detail) {
                throw new HttpException(e?.detail, HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async registerProfile(dto: RegisterProfileDto){

    }


    async signToken(userId: string, email: string){
        const payload = {
            sub: userId,
            email
        }

        return this.jwt.signAsync(payload, {
            expiresIn: '10m', // expires in 10 mins
            secret: this.config.get('JWT_SECRET')
        });
    }
}
 