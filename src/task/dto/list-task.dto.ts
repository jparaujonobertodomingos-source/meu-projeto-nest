import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";


export class ListTaskDto {

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


    @ApiPropertyOptional({ example: '', description: 'Filtra por nome (title)' })
    @IsOptional()
    @IsString()
    title?: string;

    
    @ApiPropertyOptional({ example: '', description: 'Filtra por nome (pending, in_progress,done)' })
    @IsOptional()
    @IsString()
    status?: string;


    @ApiPropertyOptional({ example: '', description: 'Filtra por nome (low, medium, high)' })
    @IsOptional()
    @IsString()
    priority?: string;


    @ApiPropertyOptional({ example: 'createdAt', description: 'Campo para ordernar' })
    @IsOptional()
    @IsIn(['id', 'title', 'status', 'priority', 'createdAt'])
    sort?: 'id' | 'title' | 'status' | 'priority' | 'createdAt' = 'createdAt';


    @ApiPropertyOptional({ example: 'desc', description:'Ordem da ordenação' })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc' = 'desc';
}