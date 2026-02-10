import { Controller, Get, Post, Body, Req, Query, ParseIntPipe,Param, Delete  } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ListProjectDto } from './dto/list-project.dto';


@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth('access-token')
  @Post()
  create(@Req() req: any, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(req.user.id,createProjectDto);
  }

  @ApiBearerAuth('access-token')
  @Get()
  findAll(@Req() req: any, @Query() query:ListProjectDto) {
      return this.projectService.findAll(req.user.id, query);
  }
  

  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.projectService.findOne(id, req.user.id);
  }


  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.projectService.remove(id, req.user.id);
  }


}