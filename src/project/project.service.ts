import { Injectable,NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, ILike } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ListProjectDto } from './dto/list-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ){}


async create(userId: number, createProjectDto:CreateProjectDto){

    const project = this.projectRepository.create({
    ...createProjectDto,
    owner:{ id: userId } as any,
});
    
    return this.projectRepository.save(project)
}


  async findAll(userId:number, query: ListProjectDto){
      const page = query.page ?? 1;
      const limit = query.limit ?? 10;
  
      const skip = (page - 1) * limit;
  
      // filtros (contém)
      const where: any = {
      owner: { id: userId },
      deletedAt: IsNull(),
      };

      if (query.name) {
      where.name = ILike(`%${query.name}%`);
      }
  
      // ordernação
      const sort = query.sort ?? 'createdAt';
      const order = (query.order ?? 'desc').toUpperCase() as 'ASC' | 'DESC';
  
      const [data, total] = await this.projectRepository.findAndCount({
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



async findOne(id, userId){

  const projeto = await this.projectRepository.findOne({
  where:{
    id: id,
    owner: {id: userId},
    deletedAt: IsNull()
  },
  });

    if(!projeto){
      throw new NotFoundException('Projeto não encontrado')
    }


  return projeto
}


async remove(id, userId){

  const soft_delete = await this.projectRepository.findOne({
  where:{
    id: id,
    owner:{ id: userId },
    deletedAt: IsNull()
  },
  });


  if(!soft_delete){
    throw new NotFoundException('Projeto não encontrado')
  }

  await this.projectRepository.update(id, { deletedAt: new Date() })

  return {deleted: true}

}

}