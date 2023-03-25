import { Controller, Post, Get, Req, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UserProfileDto } from './dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}

    @Post('/registerProfile')
    registerUserProfile(@Req() req, @Body() dto: UserProfileDto){
        
        return this.usersService.registerUserProfile(dto, req.user);
    }

    @Get('/profile')
    getUserProfile(@Req() req){
        return this.usersService.getUserProfile(req.user);
    }
}
