import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { 
    LoginDto,
    SignupDto,
    RegisterProfileDto
} from './dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ){}

    @Post('signup')
    @ApiOperation({
        description: `
         This allows the user to signup for the application, 
         please note that the api doesn't send a mail to 
         verify that users email.
        `
    })
    async signup (@Body() dto: SignupDto){
        return this.authService.signup(dto);
    }

    @Post('login')
    @HttpCode(200)
    @ApiOperation({
        description: `
            This api allows the user to login for the application.
            it returns user details and an access token.
        `
    })
    login (@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    // @Post('registerProfile')
    // registerProfile(@Body() dto: RegisterProfileDto) {
    //     return this.authService.registerProfile(dto);
    // }
}