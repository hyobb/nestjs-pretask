import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async create(postDto: CreatePostDto, user: User) {
    const post = { ...postDto, user: user };
    const ret: Post = await this.postRepository.save(post);
    return ret;
  }

  async update(postId, updatePostDto: UpdatePostDto, user: User) {
    const post = await this.postRepository.findOne({
      where: {
        postId,
      },
      relations: ['user'],
    });
    console.log(user);
    console.log(post);

    if (post.user.id != user.id) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`수정 권한이 없습니다.`],
        error: 'Forbidden',
      });

      return this.postRepository.update(postId, updatePostDto);
    }
  }
}
