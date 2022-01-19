import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ResponseCommentDto } from './dtos/response-comment.dto';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll() {
    const comments = await this.commentsService.findAll();
    return comments.map((comment) => new ResponseCommentDto(comment));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new ResponseCommentDto(await this.commentsService.findOne(id));
  }

  @UseGuards(JwtAuthGaurd)
  @Post()
  async create(
    @Param('postId') postId: number,
    @GetUser() user: User,
    @Body() commentDto: CreateCommentDto,
  ) {
    const comment = await this.commentsService.create(
      commentDto,
      postId,
      user.id,
    );

    return new ResponseCommentDto(comment);
  }
}