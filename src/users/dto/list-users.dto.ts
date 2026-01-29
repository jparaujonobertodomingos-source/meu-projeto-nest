import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";


export class ListUsersDto {

    @ApiPropertyOptional({ example: 1, description: 'Página (começa em 1)' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;


    @ApiPropertyOptional({ example: 10, description: 'Itens por página (máx 50)' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit?: number = 10;


    @ApiPropertyOptional({ example: 'joao', description: 'Filtra por nome (contém)' })
    @IsOptional()
    @IsString()
    name?: string;


    @ApiPropertyOptional({ example: 'gmail.com', description: 'Filtra por email (contém)' })
    @IsOptional()
    @IsString()
    email?: string;


    @ApiPropertyOptional({ example: 'createdAt', description: 'Campo para ordernar' })
    @IsOptional()
    @IsIn(['id', 'name', 'email', 'createdAt'])
    sort?: 'id' | 'name' | 'email' | 'createdAt' = 'createdAt';


    @ApiPropertyOptional({ example: 'desc', description:'Ordem da ordenação' })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc' = 'desc';


    @ApiPropertyOptional({ example: 'admin', description: 'Filtra por role'})
    @IsOptional()
    @IsIn(['user','admin'])
    role?:'user'|'admin';
}