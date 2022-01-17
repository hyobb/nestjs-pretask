import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('name') name) {
    if (name) {
      return this.usersService.findByName(name);
    }

    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    console.log(id);
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }
}
