import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ListUsersDto } from './dto/list-users.dto';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(RolesGuard)
  @Get()
  findAll(@Query() query: ListUsersDto){
    return this.usersService.findAll(query);
    }

   @ApiBearerAuth('access-token')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

   @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // Só ADMIN pode atualizar
  @ApiBearerAuth('access-token')
  @UseGuards(RolesGuard)
  @Roles('admin')  
  @Patch(':id')
  update(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateUserDto: UpdateUserDto,
) {
  return this.usersService.update(id, updateUserDto);
}

  @ApiBearerAuth('access-token')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/role')
  updateRole(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateUserRoleDto,
) {
  return this.usersService.updateRole(id, dto.role);
}
}
