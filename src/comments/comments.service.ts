import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './comments.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { updateCommentDto } from './dtos/update-comment.dto';
import { DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomForbiddenException } from '../libs/exceptions/custom-forbidden.exception';

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
    return this.commentRepository.findOneOrFail(id);
  }

  async create(commentDto: CreateCommentDto, postId: number, userId: number) {
    const comment = { ...commentDto, postId: postId, userId: userId };
    return await this.commentRepository.save(comment);
  }

  async update(id: number, userId: number, updateCommentDto: updateCommentDto) {
    const comment = await this.commentRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (comment.user.id != userId) {
      throw new CustomForbiddenException();
    }

    await this.commentRepository.update(id, updateCommentDto);
    return this.commentRepository.findOneOrFail(id);
  }

  async delete(id: number, userId: number): Promise<DeleteResult> {
    const comment = await this.commentRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (comment.user.id != userId) {
      throw new CustomForbiddenException();
    }

    return this.commentRepository.delete(id);
  }
}
