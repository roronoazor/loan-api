import { Controller, Post, Get, Req, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { UserProfileDto } from './dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}

    @Post('/registerProfile')
    @ApiOperation({
        description: `This api allows for collection of basic information from
        users to create thier profile, this serves as a very minor
        version of kyc for the customer.`
    })
    registerUserProfile(@Req() req, @Body() dto: UserProfileDto){
        
        return this.usersService.registerUserProfile(dto, req.user);
    }

    @ApiOperation({
        description:  `
        This api returns the profile of the user, which 
        serves as a minor version of kyc for the customer.
        `
    })
    @Get('/profile')
    getUserProfile(@Req() req){
        return this.usersService.getUserProfile(req.user);
    }
}
