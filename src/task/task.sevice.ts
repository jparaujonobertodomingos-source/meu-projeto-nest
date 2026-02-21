import { Injectable,NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository,ILike, Not } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Project } from 'src/project/entities/project.entity';
import { ListTaskDto }  from './dto/list-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';




@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    ){}


async create(projectId, userId, createTaskDto: CreateTaskDto) {

    const project = await this.projectRepository.findOne({
    where:{
        id: projectId,
        owner: { id: userId },
        deletedAt: IsNull(),
    }
    });


    if(!project){
        throw new NotFoundException('Project not found')
    }

    const task = await this.taskRepository.create({
        ...createTaskDto,
        project,
    });

    await this.taskRepository.save(task);

    return task;

}



async findAll(projectId, userId, query: ListTaskDto) {

    const projeto = await this.projectRepository.findOne({
        where:{
            id: projectId,
            owner: { id: userId },
            deletedAt: IsNull(),
        }
    });

    if(!projeto){
        throw new NotFoundException('Project not found')
    };


    
      const page = query.page ?? 1;
      const limit = query.limit ?? 10;
  
      const skip = (page - 1) * limit;
  
      // filtros (contém)
      const where: any = {
        projectId: projeto.id
    };

        if (query.title) {
      where.title = ILike(`%${query.title}%`);
      }


        if (query.status) {
      where.status = query.status
      }

        if (query.priority) {
      where.priority = query.priority;
      }
  
      // ordernação
      const sort = query.sort ?? 'createdAt';
      const order = (query.order ?? 'desc').toUpperCase() as 'ASC' | 'DESC';
  
      const [data, total] = await this.taskRepository.findAndCount({
        where,
        take: limit,
        skip,
        order: { [sort]: order },
      });
  
      const totalPages = Math.ceil(total / limit);
  
      return{
        data,
        meta: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    }


  async findOne(projectId, taskId, userId){

    const projeto = await this.projectRepository.findOne({
      where:{
        id: projectId,
        owner: {id: userId},
        deletedAt: IsNull(),
      }});

    if (!projeto) {
      throw new NotFoundException('Project not exist')
    }


    const task = await this.taskRepository.findOne({
      where:{
        id:taskId,
        project: { id: projectId },
      }});

    
    if (!task){
      throw new NotFoundException('Task not exist')
    }

    return task


  }


  async update(projectId, taskId, userId, updateTaskDto:UpdateTaskDto){

    const project = await this.projectRepository.findOne({
      where:{
        id: projectId,
        owner:{ id: userId },
        deletedAt: IsNull(),
      }});


      if(!project){
        throw new NotFoundException('Project not found');
      }


      const task = await this.taskRepository.findOne({
        where:{
          project: {id: projectId},
          id: taskId,
        }});


        if(!task){
          throw new NotFoundException('Task not found');
        }


        Object.assign(task, updateTaskDto);


        await this.taskRepository.save(task);

        
        return task;


  }


  async sof_delete(projectId, taskId, userId) {

    const project = await this.projectRepository.findOne({
      where:{
        id: projectId,
        owner: {id: userId},
        deletedAt: IsNull(),
      }});


    if(!project){
      throw new NotFoundException('Project not found');
    }


    const task = await this.taskRepository.findOne({
      where:{
        project: { id: projectId },
        id: taskId,
        deletedAt: IsNull(),
      }});


    if(!task){
      throw new NotFoundException('Task not found');
    }


    task.deletedAt = new Date()

    await this.taskRepository.save(task)


    return { deleted: true }

  }

}