import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comments.repository';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';
import { PostRepository } from 'src/posts/post.repository';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      CommentRepository,
      PostRepository,
      UserRepository,
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentModule {}
