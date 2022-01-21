import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/libs/decorators/get-user.decorator';
import { BaseResponseDto } from 'src/libs/dtos/base-response.dto';
import { User } from 'src/users/entities/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ResponseCommentDto } from './dtos/response-comment.dto';
import { updateCommentDto } from './dtos/update-comment.dto';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(@Param('postId') postId: number) {
    const comments = await this.commentsService.findAll(postId);

    return BaseResponseDto.OK_WITH(
      comments.map((comment) => new ResponseCommentDto(comment)),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const comment = await this.commentsService.findOne(id);

    return BaseResponseDto.OK_WITH(new ResponseCommentDto(comment));
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

    return BaseResponseDto.OK_WITH(new ResponseCommentDto(comment));
  }

  @UseGuards(JwtAuthGaurd)
  @Patch(':id')
  async patch(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() commentDto: updateCommentDto,
  ) {
    const comment = await this.commentsService.update(id, user.id, commentDto);

    return BaseResponseDto.OK_WITH(new ResponseCommentDto(comment));
  }

  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  async delete(@Param('id') id: number, @GetUser() user: User) {
    this.commentsService.delete(id, user.id);

    return BaseResponseDto.OK('삭제되었습니다.');
  }
}
