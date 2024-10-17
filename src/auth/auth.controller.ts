import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO } from './signup.dto';
import { LogInDto } from './login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('/register')
        async register(@Body() signUpDTO:signUpDTO):Promise<{token}> {

            return await this.authService.signUp(signUpDTO)

        }

    @Get('login')
        async login(@Body() logInDto:LogInDto ):Promise<{token:string}>{
            return await this.authService.logIn(logInDto)
        }
}
