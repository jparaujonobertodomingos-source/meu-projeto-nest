import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ListUsersDto } from './dto/list-users.dto';
import { ILike } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ){}

  create(createUserDto: CreateUserDto) {
  const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }


  findOne(id: number) {
    return this.usersRepository.findOne({where: {id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
    return {deleted: true};
  }

  findByEmail(email: string){
    return this.usersRepository.findOne({ where: { email } });

  }

  async updateRole(id: number, role:string){
    await this.usersRepository.update(id, { role });
    return this.findOne(id);
  }

  async updateRefreshToken(userId: number, refreshTokenHash: string | null ){
    await this.usersRepository.update(userId, { refreshToken: refreshTokenHash });
  }

  async findAll(query: ListUsersDto){
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const skip = (page - 1) * limit;

    // filtros (contém)
    const where: any = {};

    if (query.role) {
      where.role = query.role
    }

    if(query.name){
      where.name = ILike(`%${query.name}%`);
    }

    if (query.email){
      where.email = ILike(`%${query.email}%`)
    }

    // ordernação
    const sort = query.sort ?? 'createdAt';
    const order = (query.order ?? 'desc').toUpperCase() as 'ASC' | 'DESC';

    const [data, total] = await this.usersRepository.findAndCount({
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
  
}
