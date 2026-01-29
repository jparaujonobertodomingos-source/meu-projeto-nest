import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    // registro
    async register(registerDto: RegisterDto) {
        const { name, email, password } = registerDto;

        // verifica se já existe usuario com esse email
        const existing = await this.usersService.findByEmail(email);
        if (existing) {
            throw new UnauthorizedException('Email já está em uso');
        }

        // hash na senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
            role: 'user',           
        });

        // opcional: não retorna a senha
        delete (user as any).password;

        return user;
    }

    // login
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.usersService.findByEmail(email);
        if (!user){
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const passordOk = await bcrypt.compare(password, user.password);
        if (!passordOk){
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };

        // access token (usa o expiresIn padrão do JwtModule: 1h)
        const accessToken = await this.jwtService.signAsync(payload);

        // refresh token (7 dias)
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as any,
        });

        // salvar HASH do refresh token no banco
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        await this.usersService.updateRefreshToken(user.id, refreshTokenHash);

        // opcional: esconder senha
        delete (user as any).password;
        delete (user as any).refreshToken;

        return {
            access_token: accessToken,
            refreshToken,
            user,
        };

    }


    async refresh(dto: RefreshDto){
        const { refreshToken } = dto;

        let payload: any;
        try{
        payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
            });
        }   catch {
            throw new UnauthorizedException('Refresh token inválido ou expira');
        }

        const userId = payload.sub;
        
        const user = await this.usersService.findOne(userId);
        if (!user || !user.refreshToken) {
            throw new UnauthorizedException('Refresh token inválido');
        }

        const isRefreshValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isRefreshValid) {
            throw new UnauthorizedException('Refresh token inválido');
        }

        const newPayload = { sub: user.id, email: user.email, role: user.role };
        const access_token = await this.jwtService.signAsync(newPayload);

        return { access_token };
    }


    async logout(userId: number){
        await this.usersService.updateRefreshToken(userId, null);
        return { loggedOut: true };
    }

}

