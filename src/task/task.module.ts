import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Task } from './entities/task.entity';
import { Project } from 'src/project/entities/project.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.sevice';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
})
export class TaskModule {}
