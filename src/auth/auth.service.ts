import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

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

        const token = await this.jwtService.signAsync(payload);

        // opcional: esconder senha
        delete (user as any).password;

        return {
            access_token: token,
            user,
        };

    }

}

