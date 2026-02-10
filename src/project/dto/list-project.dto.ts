import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";


export class ListProjectDto {

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


    @ApiPropertyOptional({ example: '', description: 'Filtra por nome (contém)' })
    @IsOptional()
    @IsString()
    name?: string;


    @ApiPropertyOptional({ example: 'createdAt', description: 'Campo para ordernar' })
    @IsOptional()
    @IsIn(['id', 'name', 'createdAt'])
    sort?: 'id' | 'name' | 'createdAt' = 'createdAt';


    @ApiPropertyOptional({ example: 'desc', description:'Ordem da ordenação' })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc' = 'desc';
}