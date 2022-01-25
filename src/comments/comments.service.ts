import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './comments.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { updateCommentDto } from './dtos/update-comment.dto';
import { DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: CommentRepository,
  ) {}

  async findAll(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({ postId: postId });
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
