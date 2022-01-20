import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './comments.repository';
import { PostRepository } from 'src/posts/post.repository';
import { UserRepository } from 'src/users/user.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { updateCommentDto } from './dtos/update-comment.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({ postId: postId});
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne(id);
  }

  async create(commentDto: CreateCommentDto, postId: number, userId: number) {
    const comment = { ...commentDto, postId: postId, userId: userId };
    return await this.commentRepository.save(comment);
  }

  async update(id: number, userId: number, updateCommentDto: updateCommentDto) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (comment.user.id != userId) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`수정 권한이 없습니다.`],
        error: 'Forbidden',
      });
    }

    await this.commentRepository.update(id, updateCommentDto);
    return this.commentRepository.findOneOrFail(id);
  }

  async delete(id: number, userId: number): Promise<DeleteResult> {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (comment.user.id != userId) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`수정 권한이 없습니다.`],
        error: 'Forbidden',
      });
    }

    return this.commentRepository.delete(id);
  }
}
