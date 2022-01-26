import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(userDto);

    return user;
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  async findByEmail(email: string): Promise<User> {
    console.log(email);
    const user = this.userRepository.findByEmail(email);
    console.log(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByName(name: string): Promise<User[]> {
    return this.userRepository.findByName(name);
  }
}
