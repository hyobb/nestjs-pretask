import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ResponseUserDto } from './dtos/response-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query('name') name) {
    const users: Array<User> = name
      ? await this.usersService.findByName(name)
      : await this.usersService.findAll();

    return users.map((user) => new ResponseUserDto(user));
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return new ResponseUserDto(await this.usersService.findOne(id));
  }

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return new ResponseUserDto(await this.usersService.create(userDto));
  }
}
