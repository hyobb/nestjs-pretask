import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(userDto);

    console.log(user);
    return user;
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByName(name: string): Promise<User[]> {
    return this.userRepository.findByName(name);
  }
}