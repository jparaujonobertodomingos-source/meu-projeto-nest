import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { RefreshDto } from './dto/refresh.dto';
import { Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Public()
    @Post('login')
    login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto);
    }

    @Public()
    @Post('refresh')
    refresh(@Body() dto: RefreshDto ){
        return this.authService.refresh(dto);
    }

    @Post('logout')
    logout(@Req() req: any ){
        return this.authService.logout(req.user.id)
    }

}
