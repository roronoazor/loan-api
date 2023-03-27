import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
    async signup (@Body() dto: SignupDto){
        return this.authService.signup(dto);
    }

    @Post('login')
    @HttpCode(200)
    login (@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    // @Post('registerProfile')
    // registerProfile(@Body() dto: RegisterProfileDto) {
    //     return this.authService.registerProfile(dto);
    // }
}