import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async create(postDto: CreatePostDto, user: User) {
    const post = { ...postDto, userId: user.id };
    console.log('service');
    console.log(post);
    console.log(user);
    return this.postRepository.save(post);
  }
}
