import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { DeleteResult } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: PostRepository,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async create(postDto: CreatePostDto, user: User) {
    if (user == undefined) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: [`로그인 후 게시글 작성이 가능합니다.`],
        error: 'UnAuthorized',
      });
    }

    const post = { ...postDto, user: user };
    const ret: Post = await this.postRepository.save(post);
    return ret;
  }

  async update(id: number, user: User, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (post.user.id != user.id) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`수정 권한이 없습니다.`],
        error: 'Forbidden',
      });
    }

    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOneOrFail(id);
  }

  async delete(id: number, user: User): Promise<DeleteResult> {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (post.user.id != user.id) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`수정 권한이 없습니다.`],
        error: 'Forbidden',
      });
    }

    return this.postRepository.delete(id);
  }
}
