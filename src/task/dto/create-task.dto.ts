import { Type } from "class-transformer";
import {  IsIn,IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

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
    dueDate?: Date;
}