import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    name: string;


    @IsEmail()
    email:string;

    @IsString()
    @MinLength(4)
    password: string;

    @IsOptional()
    @IsString()
    role?: string;
}