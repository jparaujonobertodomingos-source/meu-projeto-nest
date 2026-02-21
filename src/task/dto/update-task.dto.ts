import { Type } from "class-transformer";
import {  IsIn,IsDate, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {


    @IsString()
    @IsOptional()
    title?: string | null;

    @IsString()
    @IsOptional()
    description?: string | null;

    @IsString()
    @IsOptional()
    @IsIn(['pending' , 'in_progress' , 'done'])
    status?: 'pending' | 'in_progress' | 'done';

    @IsString()
    @IsOptional()
    @IsIn(['low' , 'medium' , 'high'])
    priority?: 'low' | 'medium' | 'high';

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dueDate?: Date | null;
}
