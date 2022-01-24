import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BaseResponseDto } from '../libs/dtos/base-response.dto';
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

    return BaseResponseDto.OK_WITH(
      users.map((user) => new ResponseUserDto(user)),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);

    return BaseResponseDto.OK_WITH(new ResponseUserDto(user));
  }

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    const user = await this.usersService.create(userDto);

    return BaseResponseDto.OK_WITH(new ResponseUserDto(user));
  }
}
