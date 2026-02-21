import { Controller, Post, Body, Req,  ParseIntPipe, Param, Get, Query, Patch, Delete  } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TaskService } from './task.sevice';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTaskDto } from './dto/list-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';



@ApiTags('Task')
@Controller('projects/:projectId/tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth('access-token')
  @Post()
  create(@Param('projectId', ParseIntPipe) projectId: number ,@Req() req: any, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create( projectId, req.user.id, createTaskDto);
  }


  @ApiBearerAuth('access-token')
  @Get()
  findAll(@Param('projectId', ParseIntPipe) projectId:number, @Req() req: any, @Query() query:ListTaskDto) {
    return this.taskService.findAll( projectId, req.user.id, query)
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('projectId', ParseIntPipe) projectId:number,  @Param('id', ParseIntPipe) id:number, @Req() req: any){
    return this.taskService.findOne(projectId, id, req.user.id)
  }

  @ApiBearerAuth('access-token')
  @Patch(':id')
  update(@Param('projectId', ParseIntPipe) projectId:number,  @Param('id', ParseIntPipe) id:number, @Req() req: any, @Body() updateTaskDto:UpdateTaskDto){
    return this.taskService.update(projectId, id, req.user.id, updateTaskDto)
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  sof_delete(@Param('projectId', ParseIntPipe) projectId:number,  @Param('id', ParseIntPipe) id:number, @Req() req: any){
    return this.taskService.sof_delete(projectId, id, req.user.id)
  }




}