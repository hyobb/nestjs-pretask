import { Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './comments.repository';
import { PostRepository } from 'src/posts/post.repository';
import { UserRepository } from 'src/users/user.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne(id);
  }

  async create(commentDto: CreateCommentDto, postId: number, userId: number) {
    const comment = { ...commentDto, postId: postId, userId: userId };
    return await this.commentRepository.save(comment);
  }
}
