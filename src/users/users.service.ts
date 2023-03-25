import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {  SignupDto } from 'src/auth/dto';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserProfileDto } from './dto';
import { DeepPartial } from 'typeorm';
import { IdentificationTypeEnum } from './enums';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>
        ) {}

    async hashPassword(plainPassword:string) :Promise<string> {
        const hashed = await bcrypt.hash(plainPassword, 10);
        return hashed;
    }

    
    async verifyPassword(plainTextPassword: string, hashedPassword: string) :Promise<boolean> {
        const h = await bcrypt.hash(plainTextPassword, 10);
        
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
        return true;
    }

    async createUser(dto: SignupDto) :Promise<User> {

        const user = this.usersRepository.save({
            ...dto,
        });

        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.usersRepository.findOneBy({ email });
        if (user) {
          return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async registerUserProfile(
        dto: UserProfileDto,
        user: User
        ){

        // check if that user already has a profile
        // if yes just return the profile
        // to the user
        let profile: DeepPartial<UserProfile>;
        const { bvn, phoneNumber } = dto;
        profile = await this.userProfileRepository.findOne({where:{ user }});
        if (profile) {
            return profile;
        }

        // check if that users phone number or bvn is already taken
        profile = await this.userProfileRepository.findOne({where:[{ bvn }, { phoneNumber }]});

        if (profile){
            throw new HttpException('BVN or Phone Number is already taken', HttpStatus.BAD_REQUEST);
        }

        const { identificationType, ...rest } = dto;
        let userProfile = this.userProfileRepository.create({
            ...rest,
            user,
            'createdBy': 'self',
            'lastUpdatedBy': 'self',
            identificationType: identificationType as DeepPartial<IdentificationTypeEnum>,
        }); 
        const savedProfile = this.userProfileRepository.save(userProfile);

        return { message: 'success', data: { profile: savedProfile } };
    }

    async getUserProfile(user: User){
        const { id:userId } = user; 
        const profile = await this.userProfileRepository.findOne({ where: { user: { id: userId } },  });
        if (!profile) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return { message: 'success', data : { profile } }
    }
}
